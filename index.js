const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const farmIssues = new Map()
const farmIssue= {id : "1" ,  editNum : "", editAddress: "", imgUrl : ""}
farmIssues.set(farmIssue.id , farmIssue)



function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

console.log(generateUUID());



app.post("/farmIssue", (req, res) => {
    let body = req.body
    try{
        farmIssues.set(0, body)
        res.json({success: true})
    }catch(e){
        console.log(e)
        res.json({success:false})
    }

})


app.get("/farmIssue/list", (req, res) => {
    console.log(farmIssues)
    res.json({success: true, IssueList:Array.from(farmIssues.values())})
})


app.post("/farmIssue/delete", (req, res) => {
    let body = req.body
    try{
        console.log(body)
        farmIssues.set("1" , body)
        res.json({success: true})
    }catch(e){
        console.log(e)
        res.json({success:false})
    }
})

//node index.js
app.listen(4000, () => console.log("start"));