export default{
    getOrbs: function(data){
        let orbs = [];
        for(let key in obj){
            let data = obj[key];
            for(let i = 0; i < 4; i++){
                let d = data & 0xFF;
                data = data >> 8;
                orbs.push(d);
            }
        }
        let result = orbs.filter((v,i)=>{
            if(orbsIndexs.indexOf(i) != -1) return true;
        });
        return result;
    }
}