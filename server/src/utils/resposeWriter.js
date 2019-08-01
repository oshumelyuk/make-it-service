export default async function resposeWriter(action, req, resp, next) {
  const data =  await action(req, resp);
  resp.status(200).json({
    success: true,
    data: data
  });
  next();
}

// export default function resposeWriter(action, req, resp, next) {
//   action(req, resp).then(data => {
//     resp.status(200).json({
//       success: true,
//       data: data
//     });
//     next();
//   });
// }
