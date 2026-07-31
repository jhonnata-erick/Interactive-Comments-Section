export async function importData() {
  const dados = localStorage.getItem("dados");
  if (dados !== null) {
    const data: {} = JSON.parse(dados);
    return data;
  } else {
    const data: {} = await fetchJSON();
    return data;
  }
}
async function fetchJSON() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    window.alert("Fetch operation failed: " + error);
    console.error("Fetch operation failed:", error);
    throw error;
  }
}
