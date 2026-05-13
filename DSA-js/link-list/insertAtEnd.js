class Node{
    constructor(){
        this.data;
        this.next;
    }
}
class LinkList{
    constructor(){
        this.head=null;
    }
    append(data){
        let newNode=new Node(data)
        if(this.head!=null){
            this.head=newNode;
        }
        let current = this.head;
        while(current.next!=null){
            current=current.next;
        }
        current.next=newNode;
    }
    print(){
        if(this.head==null){
            console.log("empty list")
        }
    //     let current = this.head;
    //     while(current.next!=null){
    //         current=current.next;
    //     }
    //     current.next=newNode;
    }

}
let LL=new LinkList();
LL.print();