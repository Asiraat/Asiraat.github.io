document.addEventListener('DOMContentLoaded', async () => {
    const blogListElement = document.getElementById('blog-list');
    const blogPosts = [
       'https://Asiraat.github.io/Asiraat.github.io/blogs/example1.md',
        // 追加のブログ記事へのパスをここに追加します
    ];

    for (const post of blogPosts) {
        const response = await fetch(post);
        const markdown = await response.text();
        const { metadata, content } = parseMarkdownWithFrontMatter(markdown);

        const postElement = document.createElement('div');
        postElement.className = 'blog-post';

        const titleElement = document.createElement('h2');
        titleElement.textContent = metadata.title || 'No Title';
        
        const dateElement = document.createElement('p');
        dateElement.textContent = `Date: ${metadata.date || 'No Date'}`;
        
        const tagsElement = document.createElement('p');
        tagsElement.textContent = `Tags: ${metadata.tags ? metadata.tags.join(', ') : 'No Tags'}`;
        
        const contentElement = document.createElement('div');
        contentElement.innerHTML = marked(content);

        postElement.appendChild(titleElement);
        postElement.appendChild(dateElement);
        postElement.appendChild(tagsElement);
        postElement.appendChild(contentElement);

        blogListElement.appendChild(postElement);
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
                metadata[key.trim()] = value.join(':').trim();
            }
        });
    }

    return { metadata, content };
}

