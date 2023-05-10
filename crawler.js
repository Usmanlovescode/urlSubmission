/***********
The code is a React component that crawls a website's webpages and extracts URLs from them.Paste this code on the top of App.js or any other component in React
************/
const [visitedUrls, setVisitedUrls] = useState([]);
const [urls, setUrls] = useState([]);
const [hasAPIKey, setHasAPIKey] = useState(false);
const host = useRef(window.location.origin);
useEffect(() => {
  async function crawlWebpageUrls() {
    // Only crawl if the page hasn't been visited before

    if (!urls.includes(host.current)) {
      setVisitedUrls([...visitedUrls, host.current]);
      // console.log("visited urls : ", visitedUrls);
    }

    const extractUrls = () => {
      const links = document.querySelectorAll("a[href]");
      const urls = [];
      for (let link of links) {
        const url = link.getAttribute("href");
        if (url.startsWith("http")) {
          urls.push(url);
        }
      }
      setUrls(urls);
    };

    extractUrls();
  }
  crawlWebpageUrls();
}, [host]);

//   ===================CrawulUrls===============================
async function crawlUrls(startUrls) {
  const newUrls = new Set(startUrls);

  while (newUrls.size > 0) {
    const currentUrl = newUrls.values().next().value;
    newUrls.delete(currentUrl);
    visitedUrls.push(currentUrl);

    console.log("Visiting:", currentUrl);

    try {
      const response = await fetch(currentUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const linkElements = doc.querySelectorAll("a[href]");
      for (const linkElement of linkElements) {
        const linkUrl = linkElement.getAttribute("href");
        if (linkUrl.startsWith("http") && !visitedUrls.includes(linkUrl)) {
          newUrls.add(linkUrl);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
crawlUrls([host]).then(() => {
  // console.log("Finished crawling all URLs");
});
console.log(urls, visitedUrls);

// =====================================
function getPaths(urls) {
  return urls.map((url) => {
    const index = url.indexOf(".com/");
    if (index === -1) {
      return "/";
    } else {
      return url.slice(index + 5);
    }
  });
}
const paths = getPaths(urls);
console.log(paths);
