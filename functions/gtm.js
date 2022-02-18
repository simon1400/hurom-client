export const GTMPageView = (url) => {

  const pageEvent = {
      event: 'VirtualPageView',
      page: url,
  };

  window && window.dataLayer && window.dataLayer.push(pageEvent);
  return pageEvent;
};
