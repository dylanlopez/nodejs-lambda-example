import process from './process';

export const handler =  async (event, context, callback) => {
  console.log("request: ", event);
  const result = await process(event)
  .then(resp => {
    return resp;
  })
  .catch(error => {
    
  });
};

// process('a');