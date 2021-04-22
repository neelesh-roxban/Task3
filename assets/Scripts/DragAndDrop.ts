// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
//       -385 -330 -275 -220 -165 -110 -55  0  55 110 165 220 275 330 385

import Rod from "./Rod";

const {ccclass, property} = cc._decorator;


@ccclass
export default class NewClass extends cc.Component {

    

    @property
    mouseDown:boolean=false;

    @property
    mouseUp:boolean=false;

    @property(cc.RigidBody)
    rb:cc.RigidBody;
    @property(cc.PhysicsBoxCollider)
    collider:cc.PhysicsBoxCollider;

   @property(Rod)
   rod:Rod;
   @property(cc.Node)
   canvas:cc.Node;
   @property
   mass:number=0
   @property
   Volume:number=2.066;
  
   
  
    
    
onLoad()
{  // this.collider.density=this.mass/this.Volume;    
    //this.collider.density=this.mass/this.Volume;    
    
   
}
   start()
   {
    console.log( "de"+this.collider.density);
    console.log("mass"+this.rb.getMass()); 
   }

   update(dt)
   { 
    this.mouseEvents();    
    
   }

  



   UpdateWeightPosition()
   {  var rodPositions=[15];

     // console.log(this.rod.placablePoints[0].position.y);
       for(var i=0;i<this.rod.placablePoints.length;i++)
         {
             rodPositions[i]=this.rod.placablePoints[i].position.x;
          //   console.log(rodPositions[i]);
         }    
      
       
       var nodePosX=this.node.position.x;
       if(this.node.position.x>-385&&this.node.position.x<385)
       {
        const closest = rodPositions.reduce((a, b) => {
            return Math.abs(b - nodePosX) < Math.abs(a - nodePosX) ? b : a;
        });
          var index=rodPositions.indexOf(closest);
          var pos=this.rod.placablePoints[index].position;      
          this.node.position=this.getPostionInOtherNode(this.canvas,this.rod.placablePoints[index]);   
       }
       
    
   }





   getPostionInOtherNode(spaceNode, targetNode)
    {
    if (targetNode.parent == null) {
      return null;
    }
    let pos = targetNode.parent.convertToWorldSpaceAR(targetNode.getPosition());
    return spaceNode.convertToNodeSpaceAR(pos);
    }


   mouseEvents()
   {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.MouseDown,this);
    this.node.on(cc.Node.EventType.MOUSE_MOVE,this.MouseMove,this);
    this.node.on(cc.Node.EventType.MOUSE_UP,this.MouseUp,this);
    
   }


    MouseDown(event)
     {
         this.mouseDown=true;          
     }




     MouseMove(event)
     {
         if(this.mouseDown==true)
         {         
         this.rb.active=false;        
         var mousePosition=event.getLocation();
         mousePosition=this.node.parent.convertToNodeSpaceAR(mousePosition);         
         this.node.position=mousePosition;        
         }
     }



     MouseUp()
     {
         
         this.rb.active=true;
         this.rb.angularVelocity=0;
         this.rb.linearVelocity=cc.v2(0,0);
         
         
         this.mouseDown=false;
         this.UpdateWeightPosition();
         
         
     }
    

    
      
}
