import Rod from "./Rod";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

@property(cc.Node)
supports:cc.Node;    
@property(cc.Label)
AngleUI:cc.Label;
@property(cc.Node)
rodNode:cc.Node;

@property(Rod)
rod:Rod;

   
    onLoad () 
    {
        cc.director.getPhysicsManager().enabled=true;
    }

    disableSupports()
    {
       this.supports.active=false;
    }

    enableSupports()
    {
      
       this.rod.reset();
       this.supports.active=true;
    }
    update()
    {
         this.AngleUI.string=Math.floor (this.rodNode.rotation).toString();
    }

   
}
