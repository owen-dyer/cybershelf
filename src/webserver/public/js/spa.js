// Fetch content from webserver asynchronously
// const fetchContent = (route) => {
//   $.ajax({
//     url: route,
//     type: "GET",
//     dataType: "html",
//     success: (content) => {

//     }
//   })
// }

// const updatePageContent = (route, container) => {
//   $.ajax({
//     url: route,
//     type: "GET",
//     dataType: "html",
//     success: (data) => {
//       $(`#${container}`).html(data);
//     },
//     error: (err) => {
//       $(`#${container}`).html(`Failed to render ${route}`);
//       console.log(err);
//     },
//   });
// };

const updatePageContent = (page, container) => {
  $(`#${container}`).load(page);
}