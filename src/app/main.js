
//states
const state = {
    currentUser: [],
    comments: [],
    idS: []
}
//data import and loading logic
async function importData() {
    try {
        const dados = localStorage.getItem('dados')
        if (typeof dados === "string") {
            const data = JSON.parse(dados)
            return data
        } else {
            const response = await fetch('data.json');
            const data = await response.json();
            return data
        }
    } catch (error){
        console.error('erro ao carregar', error)
    }
}
async function dataLoad() {
        const data = await importData();
        ({currentUser: state.currentUser, comments: state.comments, idS: state.idS} = data);
        const {currentUser, comments, idS} = state
        renderPage(currentUser, comments, idS);
}
dataLoad()
//rendering functions

const actualDate = new Date()

function renderPage(currentUser, comments, idS) {
    document.body.innerHTML = ""
    const page = document.createElement("div");
    page.classList.add('commentSection');
    document.body.appendChild(page);
    renderComments(page, currentUser, comments)
    renderCommentSection(page, currentUser)
    newCommentEventHandler(currentUser, comments, idS)
    replyEventListener(currentUser, comments, idS);
}
function renderComments(page, currentUser, comments) {
    comments.sort((comment1, comment2) => (comment1.upVoted - comment1.downVoted) - (comment2.upVoted - comment2.downVoted))
    const commentsPage = comments.map(comment => buildComment(comment, currentUser)).join("")
    /*console.log('rendering: '+commentsPage+' on '+page.outerHTML)*/
    page.innerHTML = commentsPage;
    console.log('page render complete');
    
}
function renderReplies(replies, currentUser, id, username) {
    const buildReplies = replies.map(reply => buildReply(reply, currentUser)).join("")
    /*console.log(`replies: 
        
        rendering replies: ${buildReplies}

        `)*/
    return `
    <div class="repliesArea">
        ${buildReplies}
    </div>
    `
    
}
function buildComment(comment, currentUser) {
    const {id, content, createdAt, upVoted, downVoted, user, replies} = comment;
    const {image, username} = user;
    const when = whenCreated(createdAt);
    return `
    <div id="${id}" class="comment item">
        <div class="div">
            <div class="commentAccountInfo">
                <img class="profile" src="${image.png}">
                <span class="username">${username}</span>
                ${isYou(comment, username)}
                <span class="createdAt">${when}</span>
                
            </div>
            
            <div class="commentText">
                <span class="content">${content}</span>
            </div>
        </div>
            <div class="commentRodape">
                <div class="score ${voted(upVoted, downVoted, currentUser)}">
                    <button onclick="upVote(${id})">
                        <img class="scoreButtons" src="images/icon-plus.svg">
                    </button>
                    ${(upVoted.length-downVoted.length)}
                    <button onclick="downVote(${id})">
                        <img class="scoreButtons" src="images/icon-minus.svg">
                    </button>
                </div>
                ${isCurrentUser(comment, username)}
            </div>
    </div>
    ${replies.length > 0 ? renderReplies(replies, currentUser, id, username) : ""}
    `
}
function buildReply(reply, currentUser)  {
    const {id, content, createdAt, upVoted, downVoted, user, replyingTo} = reply;
    const {image, username} = user;
    const when = whenCreated(createdAt);
    return `
        <div id="${id}" class="replies item">
            <div class="div">
                <div class="commentAccountInfo">
                    <img class="profile" src="${image.png}">
                    <span class="username">${username}</span>
                    ${isYou(reply, username)}
                    <span class="createdAt">${when}</span>
                    
                </div>
                
                <div class="commentText">
                    <span class="content"><span class="replyingTo">@${replyingTo}</span> ${content}</span>
                </div>
            </div>
                <div class="commentRodape">
                    <div class="score ${voted(upVoted, downVoted, currentUser)}">
                        <button onclick="upVote(${id})">
                            <img class="scoreButtons" src="images/icon-plus.svg">
                        </button>
                        ${(upVoted.length-downVoted.length)}
                        <button onclick="downVote(${id})">
                            <img class="scoreButtons" src="images/icon-minus.svg">
                        </button>
                    </div>
                    ${isCurrentUser(reply, username)}
                </div>
            
        </div>
    `
}
function renderCommentSection(page, currentUser) {
    const {image, username} = currentUser
    page.innerHTML += `
    <div class="AddCommentBox">
        
        <form class="commentForm">
            <input id="${username}" class="commentInput"type="text" placeholder="Add a comment...">
            <img src="${image.png}">
            <button class="sendComment">SEND</button>
        </form>
        
    </div>
    `
}
function renderEditInput(id){
    const {comments} = state
    const indexs = indexFinder(id);
    const C = indexs[0]
    const R = indexs[1]
    const commentText = document.getElementById(id).querySelector('.commentText');
    const text = commentText.innerHTML;
    if (indexs.length > 1){
        const content = comments[C].replies[R].content
        commentText.innerHTML = `
        <form class="editForm">
        <input value="${content}" class="editInput" type="text" placeholder="Edit Your Comment">
        <button class="update" onclick="updateComment(${id})">UPDATE</button>
        <button class="cancel">cancel</button>
        </form>
        `;

    } else {
        const content = comments[C].content
        commentText.innerHTML = `
        <form>
        <input value="${content}" class="editInput" type="text" placeholder="Edit Your Comment">
        <button class="update" onclick="updateComment(${id})">UPDATE</button>
        <button class="cancel">cancel</button>
        </form>
        `;

    }
    editFormListener(commentText, text)
    
}
function voted(upVoted, downVoted, currentUser) {
    if (upVoted.includes(currentUser.username)){
        return "upVoted"
    } else if (downVoted.includes(currentUser.username)) {
        return "downVoted"
    } else {
        return ""
    }
}
//EVENTS
function whenCreated(createdAt) {
    const now = new Date()
    const createdDate = new Date(createdAt)
    const msDifference = now - createdDate;
    const sec = msDifference / 1000
    const min = msDifference / (1000*60)
    const hour = msDifference / (1000*60*60)
    const day = msDifference / (1000*60*60*24);
    const week = msDifference / (1000*60*60*24*7)
    const month = msDifference / (1000*60*60*24*7*4.3)
    const year = msDifference / (1000*60*60*24*7*4.3*12)
    if (year.toFixed(0) > 1) {return `${year.toFixed(0)} years ago`}
    else if (year.toFixed(0) == 1) {return `${year.toFixed(0)} year ago`}
    else if (month.toFixed(0) > 1) {return `${month.toFixed(0)} months ago`}
    else if (month.toFixed(0) == 1) {return `${month.toFixed(0)} month ago`}
    else if (week.toFixed(0) > 1) {return `${week.toFixed(0)} weeks ago`}
    else if (week.toFixed(0) == 1) {return `${week.toFixed(0)} week ago`}
    else if (day.toFixed(0) > 1) {return `${day.toFixed(0)} days ago`}
    else if (day.toFixed(0) == 1) {return `${day.toFixed(0)} day ago`}
    else if (hour.toFixed(0) > 1) {return `${hour.toFixed(0)} hours ago`}
    else if (hour.toFixed(0) == 1) {return `${hour.toFixed(0)} hour ago`}
    else if (min.toFixed(0) > 1) {return `${min.toFixed(0)} minutes ago`}
    else if (min.toFixed(0) == 1) {return `${min.toFixed(0)} minute ago`}
    else if (sec.toFixed(0) > 1) {return `${sec.toFixed(0)} seconds ago`}
    else if (sec.toFixed(0) == 1) {return `${sec.toFixed(0)} second ago`}
    
}
function newCommentEventHandler(currentUser, comments, idS, button) {
    const form = document.querySelector('form');
    const input = form.firstElementChild
    typeof button === "undefined" ? button = form.lastElementChild : false
    form.addEventListener('submit', function(x){
        x.preventDefault();
        if (input.value.trim() != "" && !form.classList.contains('replying')) {
            addComment(input.value.trim(), currentUser, comments, idS);
            input.value = "";
            console.log("comentando")
        } else if (input.value.trim() != "" && form.classList.contains('replying')){
            if (button.parentElement.parentElement.classList.contains('comment')) {
                const replying = comments.find(comment => comment.id == button.parentElement.parentElement.id);
                addReply(input.value.trim(), currentUser, comments, idS, button.name, replying)
                console.log("respondendo comentario")

            } else if (button.parentElement.parentElement.classList.contains('replies')) {
                const replying = comments.flatMap(comment => comment.replies || []).find(reply => reply.id == button.parentElement.parentElement.id)
                addReply(input.value.trim(), currentUser, comments, idS, button.name, replying)
                console.log("respondendo resposta")
            }
        };
        renderPage(currentUser, comments, idS);
    });
}
function replyEventListener(currentUser, comments, idS) {
    const form = document.querySelector('form');
    const input = form.firstElementChild
    document.querySelectorAll('.replyButton').forEach(button => button.addEventListener('click', function(s){
        input.focus();
        input.value = `@${button.name}`;
        form.classList.add('replying');
        form.removeEventListener('submit', function(x){})
        newCommentEventHandler(currentUser, comments, idS, button);
        form.addEventListener('input', function(y){
            if (!input.value.includes(`@${button.name}`)){
                form.classList.remove('replying')
                input.value = ""
            }
        });

    }))
}
function updateComment(id) {
    const {comments, currentUser} = state
    const indexs = indexFinder(id);
    const C = indexs[0]
    const R = indexs[1]
    if (indexs.length == 1){
        comments[C].content = document.querySelector('.editInput').value
    } else if (indexs.length == 2) {
        comments[C].replies[R].content = document.querySelector('.editInput').value
    } else {
        console.log('error')
    }
    state.comments = comments
    exportToDataJson()
}
function editFormListener(commentText, text) {
    
    const cancel = commentText.querySelector('.cancel');
    const input = commentText.querySelector('.editInput');
    input.focus();
    input.addEventListener('submit', function(blabla){
        blabla.preventDefault()
    })
    cancel.addEventListener('click', (event) => {
        if (commentText.contains(event.target))
        commentText.innerHTML = text
    })
}
function editComment(id) {
    console.log(1)
    const indexs = indexFinder(id);
    console.log(indexFinder(id))
    if (indexs.length >= 1) {
        renderEditInput(id)
    }
}
function deleteComment(id) {
    const {comments} = state
    const procura = comments.find(comment => comment.id == id)
    if (typeof procura === "undefined"){
        const indexR = comments.flatMap(comment => comment.replies || []).findIndex(reply => reply.id === id);
        const indexC = comments.findIndex(comment => comment.replies.some(reply => reply.id === id))
        console.log(id, comments, indexC);
        const replies = comments[indexC].replies
        replies.splice(indexR, 1)
        comments[indexC].replies = replies
    } else {
        const indexC = comments.findIndex(comment => comment.id == id);
        comments.splice(indexC, 1)
    }
    delete document.getElementById(id)
    state.comments = comments
    exportToDataJson()
}
function closeWindow(){
    document.querySelector('.deleteWindow').outerHTML = ""
}
function deleteAsk(id) {
    const deleteWindow = document.createElement('div');
    console.log(deleteWindow)
    deleteWindow.classList.add('deleteWindow', 'item')
    deleteWindow.innerHTML =
    `
        <h2>Delete comment</h2>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div class="buttons">
            <button class="cancel" onclick="closeWindow()">
                NO, CANCEL
            </button>
            <button class="delete" onclick="deleteComment(${id})">
                YES, DELETE
            </button>
        </div>
    `
    document.body.appendChild(deleteWindow)
   
}

function isCurrentUser(comment, username) {
    const {currentUser} = state
    const {user} = comment
    if (user.username === currentUser.username) {
        return `
        <div class="commentFunctions">
            <button onclick="deleteAsk(${comment.id})" class="deleteComment">
                <img class="icon" src="images/icon-delete.svg">
                Delete
            </button>
            <button name="${username}" onclick="editComment(${comment.id})" class="edit">
                <img class="icon" src="images/icon-edit.svg">
                EDIT
            </button>
        </div>`
    } else {
        return `<button name="${username}" class="replyButton"><img src="images/icon-reply.svg">Reply</button>`
    }
}
function isYou(comment, username) {
    const {currentUser} = state
    const {user} = comment
    if (user.username === currentUser.username) {
        return `<div class="isCurrentUser">you</div>`
    } else {return ""}
}
function addReply(input, currentUser, comments, idS, replyingTo, comment){
    console.log("adicionando resposta")
    AddReplyToData(newReplyBuild(input, currentUser, idS, replyingTo), comments, currentUser, idS, comment)
}
function addComment(input, currentUser, comments, idS) {
    console.log("adicionando comentario")

    AddToData(newCommentBuild(input, currentUser, comments, idS), comments, currentUser, idS);
    
}
function newReplyBuild(input, currentUser, idS, replyingTo){
    const finalInput = input.replace(`@${replyingTo}`, '')
    const reply = {
        id: ++idS.id,
        content: finalInput,
        createdAt: `${actualDate.toISOString()}`,
        upVoted: [],
        downVoted:[],
        replyingTo: replyingTo,
        user: currentUser,
        replies: []
    };
    return reply
}
function newCommentBuild(input, currentUser, comments, idS) {
    console.log(actualDate.toISOString())
    const comment = {
        id: ++idS.id,
        content: input,
        createdAt: `${actualDate.toISOString()}`,
        upVoted: [],
        downVoted:[],
        user: currentUser,
        replies: []
    };
    buildComment(comment, currentUser);
    return comment
}
function upVote(id) {
    const {comments, currentUser} = state
    const procura = comments.find(c => c.id === id);
if (typeof procura === "undefined"){
    const indexC = comments.findIndex(c => c.replies.some(r => r.id === id))
    const indexR = comments.flatMap(c => c.replies || []).findIndex(r => r.id === id)
    if (!comments[indexC].replies[indexR].upVoted.includes(currentUser.username)){ 
        comments[indexC].replies[indexR].downVoted = comments[indexC].replies[indexR].downVoted.filter(names => names !== currentUser.username)
        comments[indexC].replies[indexR].upVoted.push(currentUser.username)
    } else if (comments[indexC].replies[indexR].upVoted.includes(currentUser.username)){
        comments[indexC].replies[indexR].upVoted = comments[indexC].replies[indexR].upVoted.filter(names => names !== currentUser.username)
    };
} else {
    const indexC = comments.findIndex(c => c.id === id)
    if (!comments[indexC].upVoted.includes(currentUser.username)){ 
        comments[indexC].downVoted = comments[indexC].downVoted.filter(names => names !== currentUser.username)
        comments[indexC].upVoted.push(currentUser.username)
    } else if (comments[indexC].upVoted.includes(currentUser.username)){
        comments[indexC].upVoted = comments[indexC].upVoted.filter(names => names !== currentUser.username)
    };
};
    state.comments = comments;
    exportToDataJson();
}
function downVote(id) {
const {comments, currentUser} = state
const procura = comments.find(c => c.id === id);
if (typeof procura === "undefined"){
    const indexC = comments.findIndex(c => c.replies.some(r => r.id === id))
    const indexR = comments.flatMap(c => c.replies || []).findIndex(r => r.id === id)
    if (!comments[indexC].replies[indexR].downVoted.includes(currentUser.username)){ 
        comments[indexC].replies[indexR].upVoted = comments[indexC].replies[indexR].upVoted.filter(names => names !== currentUser.username)
        comments[indexC].replies[indexR].downVoted.push(currentUser.username)
    } else if (comments[indexC].replies[indexR].downVoted.includes(currentUser.username)){
        comments[indexC].replies[indexR].downVoted = comments[indexC].replies[indexR].downVoted.filter(names => names !== currentUser.username)
        
    };
} else {
    const indexC = comments.findIndex(c => c.id === id)
    if (!comments[indexC].downVoted.includes(currentUser.username)){ 
        comments[indexC].upVoted = comments[indexC].upVoted.filter(names => names !== currentUser.username)
        comments[indexC].downVoted.push(currentUser.username)
    } else if (comments[indexC].downVoted.includes(currentUser.username)){
        comments[indexC].downVoted = comments[indexC].downVoted.filter(names => names !== currentUser.username)
    };
};
state.comments = comments;
exportToDataJson();
}
//services
function AddReplyToData(reply, comments, currentUser, idS, comment) {
    console.log(reply, comments, currentUser, idS, comment)
    /*comments = comments.flatMap(element => {
        if (element == comment){
            element.replies.push(reply);
            console.log(`pushing ${reply} to ${element}`);
        } else if (element != comment && element.replies.some(r => r.id == reply.id)) {
            const index = element.replies.findIndex(r => r.id == reply.id)
            console.log(index)
            console.log(element.replies)
            element.replies.splice(index, 0, reply)
        } else { return ""}
    })*/
    const procura = comments.find(c => c.id === comment.id);
    if (typeof procura === "undefined"){
        const index = comments.findIndex(c => c.replies.some(r => r.id === comment.id))
        comments[index].replies.push(reply)
    } else {
        const index = comments.findIndex(c => c.id === comment.id )
        comments[index].replies.push(reply)
    }
    state.comments = comments;
    state.idS = idS;
    exportToDataJson()
}
function AddToData(comment, comments, currentUser, idS) {
    comments.push(comment);
    state.comments = comments;
    state.idS = idS;
    exportToDataJson()
}
function exportToDataJson(){
    const {comments, currentUser, idS} = state;
    renderPage(currentUser, comments, idS);
    localStorage.setItem("dados", JSON.stringify(state));
}

//utils
function indexFinder(id) {
    console.log(2)
    const {comments} = state
    const procura = comments.find(c => c.id === id);
if (typeof procura === "undefined"){
    const indexR = comments.flatMap(comment => comment.replies || []).findIndex(reply => reply.id === id);
    const indexC = comments.findIndex(comment => comment.replies.some(reply => reply.id === id))
    return [indexC, indexR]
} else {
    const indexC = comments.findIndex(c => c.id === id)
    
    return [indexC]
}
    
}