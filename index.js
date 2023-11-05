//Dependencies
const Request = require("request")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <webhook_link>")
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid webhook_link.")
    process.exit()
}

setInterval(function(){
    const group_id = Math.floor(Math.random() * 91020) + 300000

    Request(`https://groups.roblox.com/v1/groups/${group_id}`, function(err, res, body){
        if(err){
            console.log(`[ORGF][Invalid] https://www.roblox.com/groups/group.aspx?gid=${group_id}`)
            return
        }

        body = JSON.parse(body)

        if(!body.owner && body.publicEntryAllowed){
            Request.post("https://discord.com/api/webhooks/1169722670833750016/j2cjvJ1E3ipQdtIau60IPRc6R9DFrfUCVg48QjJSbi1SZ0fIsebnt-t7eMlMJIDt2PG2", {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `content=[ORGF][Valid] https://www.roblox.com/groups/group.aspx?gid=${group_id} | Name: ${body.name} | Members: ${body.memberCount}`
            }, function(err, res, body){
                console.log(`[ORGF][Valid] https://www.roblox.com/groups/group.aspx?gid=${group_id} | Name: ${body.name} | Members: ${body.memberCount}`)
            })
            
            return
        }else{
            console.log(`[ORGF][Invalid] https://www.roblox.com/groups/group.aspx?gid=${group_id} | Name: ${body.name} | Members: ${body.memberCount}`)
            return
        }
    })
}, 1000)
