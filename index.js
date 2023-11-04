//Dependencies const axios = require(‘axios’)

//Variables const Self_Args = process.argv.slice(2)

//Main if(!Self_Args.length){ console.log(‘node index.js <webhook_link>’) process.exit() }

if(!Self_Args[0]){ console.log(‘Invalid webhook_link.’) process.exit() }

setImmediate(function loop(){ const group_id = Math.floor(Math.random() * 1150000)
                             axios.get(`https://groups.roblox.com/v1/groups/${group_id}`)
.then(function(response){
    const body = response.data

    if(!body.owner && body.publicEntryAllowed){
        axios.post(Self_Args[0], {
            content: `[ORGF][Valid] https://www.roblox.com/groups/group.aspx?gid=${group_id} | Name: ${body.name} | Members: ${body.memberCount}`
        })
        .then(function(response){
            console.log(`[ORGF][Valid] https://www.roblox.com/groups/group.aspx?gid=${group_id} | Name: ${body.name} | Members: ${body.memberCount}`)
        })
        .catch(function(error){
            console.log(error)
        })
        
        return
    }else{
        console.log(`[ORGF][Invalid] https://www.roblox.com/groups/group.aspx?gid=${group_id} | Name: ${body.name} | Members: ${body.memberCount}`)
        return
    }
})
.catch(function(error){
    console.log(`[ORGF][Invalid] https://www.roblox.com/groups/group.aspx?gid=${group_id}`)
    return
})

setImmediate(loop)
