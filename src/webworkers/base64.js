onmessage = (e) => {
  if (!e) return;
  if (typeof e.data !== "File") {
    console.log("Data Type Incorrect (File object required): ", typeof e.data);
    return;
  }
  const reader = new FileReader();
  reader.onload(() => {
    const base64 = reader.result;
    postMessage(base64);
  });
  reader.onerror((error) => {
    postMessage(error);
  });
  reader.readAsDataURL(e.data);
};
