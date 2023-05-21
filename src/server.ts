import app from "./app";

function main() {
  try {
    app.listen(3001, "localhost", () => {
      console.log("Server Starting at port 3001");
    });
  } catch (error) {
    console.error("Server failed");
  }
}

main();
