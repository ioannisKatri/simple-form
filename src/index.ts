import app from './app'

app.listen({ port: 3000 }, (err, response) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${response}`)
})

