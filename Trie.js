export { Trie }

class TrieNode{
    constructor(){
        this.child = Array(26).fill(null);
        this.isEnd = false;
        this.number = null;
        this.name = null;
    }
}

class Trie{
    constructor(initial){
        this.root = new TrieNode();

        let dummy = initial;

        for(let i=0;i<dummy.length;i++){
            this.add(dummy[i][0],dummy[i][1])
        }
    }

    add(name,number){
        let current = this.root;
        
        for(let i=0;i<name.length;i++){
            let index = name.charCodeAt(i) - 97;
            
            if(current.child[index]==null){
                current.child[index] = new TrieNode();
            }
            current = current.child[index];
        }
        current.isEnd = true;
        current.number = number;
        current.name = name;
    }

    
    findAll(node,res){
        if(node===null){
            return;
        }
        
        for(let i=0;i<26;i++){
            if(node.child[i]!=null && node.child[i].isEnd === true){
                res.push([node.child[i].name , node.child[i].number])
            }
            this.findAll(node.child[i],res);
        }
        return res;
    }

    find(name,res){
        let current = this.root;
        for(let i=0;i<name.length;i++){
            let index = name.charCodeAt(i) - 97;
            
            if(current.child[index]==null){
                return;
            }
            current = current.child[index];
        }
        if(current.isEnd === true){
            res.push([current.name , current.number])
        }
        return this.findAll(current,res);
    }

    isEmpty(current){
        for(let i=0;i<26;i++){
            if(current.child[i]!==null){
                return false;
            }
        }
        return true;
    }

    delete(name,depth=0,current=this.root){
        if(current === null){
            return false;
        }

        if(depth == name.length){

            if(current.isEnd === true){
                current.isEnd = false;
            }
            return current;
        }

        let index = name.charCodeAt(depth) - 97;
        current.child[index] = this.delete(name,depth+1, current.child[index]);

        if(this.isEmpty(current) && current.isEnd === false){
            current=null;
        }

        return current;

    }
}











