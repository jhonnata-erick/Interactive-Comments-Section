import { Data } from "../../types/data.ts";

export async function importData(): Promise<Data> {
  let dados = localStorage.getItem("dados");
  if (dados !== null) {
    const data = JSON.parse(dados);
    return data;
  } else {
    const jsonData = await fetchJSON();
    localStorage.setItem("dados", JSON.stringify(jsonData));
    return jsonData;
  }
}
async function fetchJSON(): Promise<Data> {
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
