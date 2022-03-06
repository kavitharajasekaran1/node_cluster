const express = require("express");

const cluster = require("cluster");
const os = require("os");
const { signal } = require("nodemon/lib/config/defaults");
const app = express();

var numCpus = os.cpus().length

app.get('/',(req,res)=>{
    for(let i=0;i< 1e8; i++){

    }
    res.send(`...ok ... ${process.pid}`)
    // cluster.worker.kill()
})

if(cluster.isMaster){

    for(let i=0; i< numCpus;i++){
        cluster.fork()

    }
    cluster.on('exit', (worker,code,signal)=>{
        console.log(`workder${worker.process.pid} died`)
    cluster.fork()
    })

}else {
    app.listen(8080,()=>console.log(`server ${process.pid} @ App is running on 8080`));
}

// app.listen(8080,()=>console.log("App is running on 8080"));