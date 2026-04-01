const allUploadsContainer = document.getElementById('all-uploads-container');

async function refreshFileList() {


    try {
        const response = await fetch("/api/files")
        const filesObject = await response.json()

        if (filesObject.files.length === 0) {
            allUploadsContainer.innerHTML = "<p>No files uploaded yet</p>";
            return
        }

                

        const listHtml = filesObject.files.map((file) => {
            return `
            <ul>
                <li>
                    <p> 📄 ${file} </p>
                </li>
            </ul>
            `
        }).join("");
        allUploadsContainer.innerHTML = listHtml;
    } catch(err) {
        console.error("Error fetching files:", err);
        allUploadsContainer.innerHTML = "<p>Error loading files</p>";
        }

}

refreshFileList();