const url = new URL(window.location.href);
const actions = document.getElementById("article-header-page-actions");
if (actions) {
  const githubButton = createGitHubButton();
  const feedButton = createFeedButton();
  actions.prepend(feedButton, githubButton);
}

function createGitHubButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.classList.add(
    "collection",
    "button",
    "button-clear",
    "button-sm",
    "button-primary",
    "display-none",
    "display-inline-flex-tablet"
  );
  button.title = "Open Markdown on GitHub";
  button.addEventListener("click", () => {
    openConvertedUrl(url.href).catch(console.error);
  });
  const span = document.createElement("span");
  span.classList.add("icon", "margin-none");
  button.appendChild(span);

  const icon = document.createElement("span");
  icon.classList.add("docon", "docon-brand-github");
  span.appendChild(icon);

  return button;
}

function createFeedButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.classList.add(
    "collection",
    "button",
    "button-clear",
    "button-sm",
    "button-primary",
    "display-none",
    "display-inline-flex-tablet"
  );
  button.title = "Open the atom feed on GitHub";
  button.addEventListener("click", () => {
    openAtomFeedUrl(url.href).catch(console.error);
  });
  const span = document.createElement("span");
  span.classList.add("icon", "margin-none");
  button.appendChild(span);

  const icon = document.createElement("span");
  icon.classList.add("docon", "docon-feed");
  span.appendChild(icon);

  return button;
}

async function openAtomFeedUrl(url: string) {
  const enUrl = convertToEnglishUrl(url);
  const ghUrl = await fetchGithubUrl(enUrl);
  if (ghUrl) {
    const atomUrl = ghUrl.replace(/\/blob\//, "/commits/").concat(".atom");
    window.open(atomUrl);
  }
}

async function openConvertedUrl(url: string) {
  const enUrl = convertToEnglishUrl(url);
  const ghUrl = await fetchGithubUrl(enUrl);
  if (ghUrl) {
    window.open(ghUrl);
  }
}

function convertToEnglishUrl(url: string): string {
  return url.replace(
    /https:\/\/learn\.microsoft\.com\/[a-z]{2}-[a-z]{2}\//,
    "https://learn.microsoft.com/en-us/"
  );
}

async function fetchGithubUrl(url: string): Promise<string | null> {
  const response = await fetch(url);
  if (!response.ok) return null;
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text || "", "text/html");
  console.log(doc);
  const edit = doc.querySelector("a[data-contenteditbtn][data-bi-name='edit']");
  const hrefAttr = edit?.getAttribute("href");
  return hrefAttr ? hrefAttr : null;
}
