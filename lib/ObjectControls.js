  // TODO Make it so you can pass in renderer w / h
function ObjectControls( params ){

  this.intersected;
  this.selected;

  this.mouseHeld = false;

  this.mouse            = new THREE.Vector3();
  this.unprojectedMouse = new THREE.Vector3();
  
  this.objects          = [];

  var params = params || {};
  var p = params;

  this.domElement         = p.domElement         || document;

  // Recursively check descendants of objects in this.objects for intersections.
  this.recursive          = p.recursive          || false;
  
  this.raycaster          = new THREE.Raycaster();

  this.raycaster.near     = .1
  this.raycaster.far      =  10000;


  var addListener = this.domElement.addEventListener;

  var cb1 = this.mouseDown.bind(  this );
  var cb2 = this.mouseMove.bind(  this );
  var cb3 = this.mouseUp.bind(  this );

  this.domElement.addEventListener( 'mousedown', cb1 , false )
  this.domElement.addEventListener( 'mousemove', cb2 , false )
  this.domElement.addEventListener( 'mouseup', cb3 , false )
}


ObjectControls.prototype.mouseDown = function() {
  this.mouseHeld = true;
  this._down();
}

ObjectControls.prototype.mouseMove = function() {
  if(this.mouseHeld){
    this._down();
  }
}

ObjectControls.prototype.mouseUp = function() {
  this.mouseHeld = false;
}



// You can think of _up and _down as mouseup and mouse down
ObjectControls.prototype._down = function(){

  this.down();

  if( this.intersected ){
   
    this._select( this.intersected  );

  }
  this.selected= null;

}

ObjectControls.prototype.down = function(){}



ObjectControls.prototype._up = function(){

  this.up();

  if( this.selected ){

    this._deselect( this.selected );

  }

}

ObjectControls.prototype.up = function(){}



ObjectControls.prototype._hoverOut =  function( object ){

  this.hoverOut();
  
  this.objectHovered = false;
  
  if( object.hoverOut ){
    object.hoverOut( this );
  }

};

ObjectControls.prototype.hoverOut = function(){};



ObjectControls.prototype._hoverOver = function( object ){
 
  this.hoverOver();
  
  this.objectHovered = true;
  
  if( object.hoverOver ){
    object.hoverOver( this );
  }

};

ObjectControls.prototype.hoverOver = function(){}



ObjectControls.prototype._select = function( object ){
 
  this.select();
              
  var intersectionPoint = this.getIntersectionPoint( this.intersected );

  this.selected       = object;
  this.intersectionPoint = intersectionPoint;
 
  if( object.select ){
    object.select( this );
  }

};

ObjectControls.prototype.select = function(){}



ObjectControls.prototype._deselect = function( object ){
  
  //console.log('DESELECT');

  this.selected = undefined;
  this.intersectionPoint = undefined;

  if( object.deselect ){
    object.deselect( this );
  }

  this.deselect();

};

ObjectControls.prototype.deselect = function(){}




/*

  Changing what objects we are controlling

*/

ObjectControls.prototype.add = function( object ){

  this.objects.push( object );

};

ObjectControls.prototype.remove = function( object ){

  for( var i = 0; i < this.objects.length; i++ ){

    if( this.objects[i] == object ){
  
      this.objects.splice( i , 1 );

    }

  }

};




/*
 
   Update Loop

*/

ObjectControls.prototype.update = function(){

  this.setRaycaster();
  if( !this.selected ){

    this.checkForIntersections( );

  }else{

    this._updateSelected();

  }

};

ObjectControls.prototype._updateSelected = function(){

  if( this.selected.update ){

    this.selected.update( this );

  }

}

ObjectControls.prototype.updateSelected = function(){};




ObjectControls.prototype.setRaycaster = function(){

  this.raycaster.set( controls.getObject().position , controls.getDirection() );

}



/*
 
  Checks

*/

ObjectControls.prototype.checkForIntersections = function(){

  var intersected =  this.raycaster.intersectObjects( this.objects, this.recursive );

  if( intersected.length > 0 ){

    for (var n = 0; n < intersected.length; n++ ) {

      if ( this.recursive ) {

        var topLevelObj = this._findTopLevelAncestor( intersected[n].object );
        if ( topLevelObj ) {

          // Reset intersected.object, leave intersected.point etc. unchanged.
          // This works since in the two most common use cases the ancestor:
          // (1) contains the child object (and the intersection point)
          // (2) is not a THREE.Mesh and thus doesn't appear in the scene, 
          //     e.g. an Object3D used for grouping other related objects.
          intersected[n].object = topLevelObj;

        }

      }

    }

    this._objectIntersected( intersected );

  }else{

    this._noObjectIntersected();

  }

};




ObjectControls.prototype.getIntersectionPoint = function( i ){

  var intersected =  this.raycaster.intersectObjects( this.objects, this.recursive );
  
  return intersected[0].point.sub( i.position );

}

ObjectControls.prototype._findTopLevelAncestor = function( object ){

  // Traverse back up until we find the first ancestor that is a top-level
  // object then return it (or null), since only top-level objects (which
  // were passed to objectControls.add) handle events, even if their child
  // objects are the ones intersected.

  while ( this.objects.indexOf(object) === -1) {

    if ( !object.parent ) {

      return null;

    }

    object = object.parent;

  }

  return object;

} 



/*
 
   Raycast Events

*/

ObjectControls.prototype._objectIntersected = function( intersected ){

  // Assigning out first intersected object
  // so we don't get changes everytime we hit 
  // a new face
  var firstIntersection = intersected[0].object;

  if( !this.intersected ){

    this.intersected = firstIntersection;

    this._hoverOver( this.intersected );


  }else{

    if( this.intersected != firstIntersection ){

      this._hoverOut( this.intersected );

      this.intersected = firstIntersection;

      this._hoverOver( this.intersected );

    }

  }

  this.objectIntersected();

};

ObjectControls.prototype.objectIntersected = function(){}

ObjectControls.prototype._noObjectIntersected = function(){

  if( this.intersected  ){

    this._hoverOut( this.intersected );
    this.intersected = undefined;

  }

  this.noObjectIntersected();

};

ObjectControls.prototype.noObjectIntersected = function(){}

