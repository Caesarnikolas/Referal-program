const formTweet = document.forms.tweet;
const userTweets = document.querySelector('#userTweets');
const allTweets = document.querySelector('[data-allTweets]');
function generateInnerHtml(params) {
  return `  <input type="text" data-newImage placeholder="url картинки" value="${params.image}">
  <input type="text" data-newText placeholder="Сообщение" value="${params.text}">
  <button data-save>Сохранить изменения</button>`;
}
if (allTweets) {
  allTweets.addEventListener('click', async (event) => {
    if (event.target.dataset.like) {
      const tweetID = event.target.dataset.like;
      const response = await fetch('/tweets/like', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tweetID }),
      });
      if (response.status === 200) {
        const curTweet = await response.json();
        const likesCounter = event.target.parentNode.querySelector('span');
        likesCounter.innerText = curTweet.likes.length;
      }
    }
  });
}
if (formTweet) {
  formTweet.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formTweet).entries());
    await fetch('/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    window.location.replace('/tweets');
  });
}
if (userTweets) {
  userTweets.addEventListener('click', async (e) => {
    const id = e.target.dataset.tweetid;
    const tweet = e.target.parentNode;
    if (e.target.dataset.buttontype === 'edit') {
      const image = tweet.querySelector('[data-url]').src;
      const text = tweet.querySelector('[data-text]').innerText;
      tweet.insertAdjacentHTML('beforeend', generateInnerHtml({ image, text }));
      const buttonSave = tweet.querySelector('[data-save]');
      if (buttonSave) {
        buttonSave.addEventListener('click', async (event) => {
        const newImage = tweet.querySelector('[data-newImage]').value;
          const newText = tweet.querySelector('[data-newText]').value;
          const response = await fetch('/tweets', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: newImage, text: newText, id }),
          });
          if (response.status === 200) window.location.replace('/user/lk');
        });
      }
    }
    if (e.target.dataset.buttontype === 'delete') {
      const response = await fetch('/tweets', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (response.status === 200) {
        tweet.remove();
        window.location.replace('/user/lk');
      }
    }
  });
}
