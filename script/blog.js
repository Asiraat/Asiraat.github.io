document.addEventListener('DOMContentLoaded', async () => {
    const blogListElement = document.getElementById('blog-list');
    const blogPosts = [
        'https://raw.githubusercontent.com/Asiraat/Asiraat.github.io/main/blogs/example1.md'
        // ブログ記事の相対パス
    ];

    for (const post of blogPosts) {
        try {
            const response = await fetch(post);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            const { metadata, content } = parseMarkdownWithFrontMatter(markdown);

            const postElement = document.createElement('div');
            postElement.className = 'blog-post';

            const titleElement = document.createElement('h2');
            titleElement.textContent = metadata.title || 'No Title';
            
            const dateElement = document.createElement('p');
            dateElement.textContent = `Date: ${metadata.date || 'No Date'}`;
            
            const tagsElement = document.createElement('p');
            tagsElement.textContent = `Tags: ${Array.isArray(metadata.tags) ? metadata.tags.join(', ') : 'No Tags'}`;
            
            const contentElement = document.createElement('div');
            contentElement.innerHTML = marked.parse(content);

            postElement.appendChild(titleElement);
            postElement.appendChild(dateElement);
            postElement.appendChild(tagsElement);
            postElement.appendChild(contentElement);

            blogListElement.appendChild(postElement);
        } catch (error) {
            console.error(`Error loading blog post ${post}:`, error);
            const errorElement = document.createElement('p');
            errorElement.textContent = `Failed to load blog post: ${post}`;
            blogListElement.appendChild(errorElement);
        }
    }
});

function parseMarkdownWithFrontMatter(markdown) {
    const frontMatterRegex = /^---\n([\s\S]+?)\n---/;
    const match = markdown.match(frontMatterRegex);
    
    let metadata = {};
    let content = markdown;

    if (match) {
        const frontMatter = match[1];
        content = markdown.slice(match[0].length);

        frontMatter.split('\n').forEach(line => {
            const [key, ...value] = line.split(':');
            if (key && value) {
                const trimmedKey = key.trim();
                const trimmedValue = value.join(':').trim();
                if (trimmedKey === 'tags') {
                    metadata[trimmedKey] = trimmedValue.split(',').map(tag => tag.trim());
                } else {
                    metadata[trimmedKey] = trimmedValue;
                }
            }
        });
    }

    return { metadata, content };
}
