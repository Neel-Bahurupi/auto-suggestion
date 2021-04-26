import {Trie} from "./Trie.js";


onload = function(){

    if(!localStorage.getItem("myValue")){
        let arr = [
            ["neel","12345555"],
            ["aditya","66666666"],
            ["rohan","8888888"]
        ];
        localStorage.setItem("myValue", JSON.stringify(arr));
    }

    console.log("hi2");
    let name = document.querySelector(".name");
    let number = document.querySelector(".number");
    let add_button = document.querySelector("#add")
    let delete_input = document.querySelector("#delete_input")
    let delete_button = document.querySelector("#del")
    let search_input = document.querySelector("#myInput");
    // let cancel_button = document.querySelector("#cancel");
    let alert = document.getElementById('alert');
    const templates = document.getElementsByTagName('template')[0];
    const contact_item = templates.content.querySelector("div");
    let trie = new Trie(JSON.parse(localStorage.getItem("myValue")));



    add_button.onclick = function(){
        
        trie.add(name.value,number.value);
        
        localStorage.setItem("myValue", JSON.stringify([ ... JSON.parse(localStorage.getItem("myValue")), [name.value, number.value]]));
                
        alert.innerHTML = name.value + " added to your contact list";
        alert.style.display = "inline-block";

        name.value = "";
        number.value = "";

        setTimeout(function () {
            // Closing the alert
            alert.style.display = "none";
        }, 3000);
    }


    delete_button.onclick = function(){
        let res = [];
        
        trie.find(delete_input.value , res);
        console.log(res);
        if(res.length == 0 || res[0][0]!==delete_input.value){
            alert.innerHTML = delete_input.value + " is not present in contact list";
            alert.style.display = "inline-block";
            alert.setAttribute("class" , "alert alert-danger");
            delete_input.value = "";
            setTimeout(function () {
                // Closing the alert
                alert.style.display = "none";
                
            }, 3000);
            return;
        }
        trie.delete(delete_input.value);

        let newData = JSON.parse(localStorage.getItem("myValue"));
        let updated = [];
        let toDelete = delete_input.value;

        let i;
        for(i = 0; i < newData.length; i ++){
            if(newData[i][0] !== toDelete){
                updated.push(newData[i]);
            }
        }
        localStorage.setItem("myValue", JSON.stringify(updated));

        alert.innerHTML = delete_input.value + " deleted from your contact list";
        alert.style.display = "inline-block";
        delete_input.value = "";
        setTimeout(function () {
            // Closing the alert
            alert.style.display = "none";
            
        }, 3000);
    }
    
    let autocomplete = (inp)=>{
        // inp.input = "";
        
        inp.addEventListener("input",function(e){
            closeAllLists();

            let a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items list-group text-left");
            this.parentNode.appendChild(a);

            let res = [];
            trie.find(this.value,res);
            console.log(res);
            for(let i=0;i<res.length;i++){
                let item = contact_item.cloneNode(true);
                item.querySelector('#Name').innerText = res[i][0];
                item.querySelector('#Number').innerHTML = "<strong>" + res[i][1] +
                                                                "</strong>";
                item.number = res[i][1];
    
                a.appendChild(item);
                
            }
        })



        let closeAllLists = (elmnt) => {
            const x = document.getElementsByClassName("autocomplete-items");
            for (let i = 0; i < x.length; i++) {
                if (elmnt !== x[i] && elmnt !== inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        };

        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
            search_input.value="";
            delete_input.value = "";
        });

    }
    
    
    autocomplete(document.getElementById("myInput"));
    
            
            
            

}
