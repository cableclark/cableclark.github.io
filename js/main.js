async function loadStaticNav() {
    try {
        // 1. Fetch the static HTML file
        const response = await fetch('parts/menu.html');
        const templateSource = await response.text();

        // 2. Compile it (even if there are no variables, this prepares the string)
        const template = Handlebars.compile(templateSource);

        // 3. Inject it (we pass an empty object {} since there are no variables)
        document.getElementById('header-placeholder').innerHTML = template({});
        
    } catch (error) {
        console.error("Error loading navigation:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadStaticNav);



