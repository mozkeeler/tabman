var cm = require('sdk/context-menu');
var tabs = require('sdk/tabs');

function tabCompare(tabA, tabB) {
  if (tabA.url < tabB.url) {
    return -1;
  }
  if (tabA.url == tabB.url) {
    return 0;
  }
  return 1;
}

function sortTabs() {
  var urls = [];
  for (var tab of tabs) {
    urls.push({ url: tab.url, tab: tab });
  }
  urls.sort(tabCompare);
  for (var i in urls) {
    urls[i].tab.index = i;
  }
}

cm.Item({
  label: 'Sort Tabs',
  contentScript: 'self.on("click", function(node, data) { self.postMessage(); });',
  onMessage: sortTabs
});
