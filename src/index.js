const quotesUrl = 'http://localhost:3000/quotes?_embed=likes'

// populate page with quotes
fetch(quotesUrl)
.then(r => r.json())
.then(data => data.forEach((singleQuote) => renderQuotes(singleQuote)))

function renderQuotes(singleQuote) {
    const quoteCard = document.createElement('li')

    const blockquote = document.createElement('blockquote')
    blockquote.classList.add('blockquote')

    const quote = document.createElement('p')
    quote.classList.add('mb-0')
    quote.innerText = singleQuote.quote

    const footer = document.createElement('footer')
    footer.classList.add('blockquote-footer')
    footer.innerText = singleQuote.author

    const br = document.createElement('br')

    const likeBtn = document.createElement('button')
    likeBtn.classList.add('btn-success')
    likeBtn.innerText = 'Likes: '

    const likeCount = document.createElement('span')
    likeCount.innerText = 0

    likeBtn.appendChild(likeCount)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('btn-danger')
    deleteBtn.innerText = 'Delete ❌'

    blockquote.append(quote, footer, br, likeBtn, deleteBtn)

    const quoteList = document.getElementById('quote-list')
    quoteList.append(blockquote)
}