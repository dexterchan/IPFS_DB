const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually. 
// Note that these options need to be passed to IPFS in 
// all examples in this document even if not specfied so.
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  },
}

// Create IPFS instance
const ipfs = new IPFS(ipfsOptions)

ipfs.on('ready', async() => {
  // Create OrbitDB instance
  const orbitdb = new OrbitDB(ipfs)
  
  const access = {
		write: [orbitdb.key.getPublic('hex')],
  }

  const db = await orbitdb.keyvalue("/orbitdb/QmcswCMgT6qrDtpCRUZGVdcFy7n6Ax2cMcRTiUaBgSQpBK/first-database")
  console.log("DB address:"+db.address.toString())
  console.log("DB keypair:\n"+db.key)
  console.log("DB public key:\n"+db.key.getPublic('hex'))
  //console.log("try insert entries....")
  //await db.put("name","hello")
  db.events.on("replicated",()=>{
	console.log("get entries...")
	const value = db.get("name")
	console.log(value)
  })
  //console.log("DB private key:\n"+db.key.getPrivate('hex'))
})
