import mongoose from 'mongoose'
type Connection = {
  isConnected?: number
}
const connection: Connection = {}

const connedtDb = async () => {
  if (connection.isConnected) {
    console.log('using existed connection')
    return
  }
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('DB Connexted')
  // eslint-disable-next-line require-atomic-updates
  connection.isConnected = db.connections[0].readyState
}

export default connedtDb
