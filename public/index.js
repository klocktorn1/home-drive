const allUploadsContainer = document.getElementById('all-uploads-container');

async function refreshFileList() {


    try {
        const response = await fetch("/api/files")
        const files = await response.json()

        if (files.length === 0) {
            allUploadsContainer.innerHTML = "<p>No files uploaded yet</p>";
            return
        }

        const listHtml = files.map ((file) => {
            `<ul>
                <li>
                    <p> 📄 ${file} </p>
                </li>
            </ul>
            `
        })
        allUploadsContainer.innerHTML = listHtml.join("");
    } catch(err) {
        console.error("Error fetching files:", err);
        allUploadsContainer.innerHTML = "<p>Error loading files</p>";
        }

}

refreshFileList();