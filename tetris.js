
/*
 *  Project: 		Tetris 1.0
 *  Description: 	Simple tetris game build with floating divs
 *  Author: 		M
 *  License: 		-
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.

;(function ( $, window, document, undefined ) {


	// indexOf function for IE <=8
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj, start) {
			for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) { return i; }
			}
			return -1;
		}
	}	
	$.isSubstring = function(haystack, needle) {
    return haystack.indexOf(needle) !== -1;
	};
	
	var delay = (function(){
				var timer = 0;
				return function(callback, ms){
				clearTimeout (timer);
				timer = setTimeout(callback, ms);
				};
			})();

	var clickHold = (function(){
			return function(obj, callback, ms){
			var intv
			$(document).on( 'mousedown', obj, function(e){
				var el = $(this)
				intv = setInterval( function(){callback( el )}, ms );
			})
			$(document).on( 'mouseup', obj, function(e){
				clearInterval(intv)
			})
			};
		})();		
	

	Array.prototype.allValuesSame = function(start, end) {

   // for(var i = 0; i < this.length; i++)
    for(var i = start; i < end; i++)
    {
        if(this[i] !== this[start])
            return false;
    }

    return true;
}
	
	// IE 7 document.querySelectorAll for listenScrollAgain
	if (!document.querySelectorAll) {
	  document.querySelectorAll = function (selectors) {
		var style = document.createElement('style'), elements = [], element;
		document.documentElement.firstChild.appendChild(style);
		document._qsa = [];

		style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
		window.scrollBy(0, 0);
		style.parentNode.removeChild(style);

		while (document._qsa.length) {
		  element = document._qsa.shift();
		  element.style.removeAttribute('x-qsa');
		  elements.push(element);
		}
		document._qsa = null;
		return elements;
	  };
	}

	if (!document.querySelector) {
	  document.querySelector = function (selectors) {
		var elements = document.querySelectorAll(selectors);
		return (elements.length) ? elements[0] : null;
	  };
	}
		
		
	var KEY = {
			A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,
			F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,
			'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,
			'R0':96,'R1':97,'R2':98,'R3':99,'R4':100,'R5':101,'R6':102,'R7':103,'R8':104,'R9':105,
			INSERT: 45, CAPS_LOCK: 20, NUM_LOCK: 144, SCROLL_LOCK: 145, BREAK: 19,
			TAB: 9, ENTER: 13, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39,
			DOWN: 40, SHIFT: 16, CTRL: 17, ALT: 18, PAGE_UP: 33, PAGE_DOWN: 34,
			HOME: 36, END: 35, BACKSPACE: 8, DELETE: 46,
			isArrow: function (k) {
				k = k.which ? k.which : k;
				switch (k) {
				case KEY.LEFT:
				case KEY.RIGHT:
				case KEY.UP:
				case KEY.DOWN:
					return true;
				}
				return false;
			},
			isControl: function (e) {
				var k = e.which;
				switch (k) {
				case KEY.SHIFT:
				case KEY.CTRL:
				case KEY.ALT:
					return true;
				}

				if (e.metaKey) return true;

				return false;
			},
			isFunctionKey: function (k) {
				k = k.which ? k.which : k;
				return k >= 112 && k <= 123;
			}
		}
		



    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'tetris',
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function tetrisPlugin( element, options ) {
        //this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        
		this.elem = element;
		this.$elem = $(element);
		//this.$elem_original = this.$elem
		this.options = options;
		
		//this.multiple = false;
		//this.selected = []
		//this.multiple_options = []
		
		//this.page = 1
		//this.allLoaded = false
		
		//this.limit = 20
		//alert(1)
		//this.options.maximumInputLength = 256
		
		// This next line takes advantage of HTML5 data attributes
		// to support customization of the plugin on a per-element
		// basis. For example,
		// <div class=item' data-plugin-options='{"message":"Goodbye World!"}'></div>
		//this.metadata = this.$elem.data( 'plugin-options' );
		this.metadata = this.$elem.data( );
		
		
		
		//Canvas stuff
	//var canvas = $("#canvas")[0];
	//canvas.width  = 400
	//canvas.height  = 600
	//var ctx = canvas.getContext("2d");
	//var w = $("#canvas").width();
	//var h = $("#canvas").height();
	
	
	//Lets save the cell width in a variable for easy control
	
		
		
		
		this._init();
		
		
		
		
		
		
		
		
		
    }

	
	//Plugin.prototype = 
	tetrisPlugin.prototype = 
	{
		
		
		
		defaults: { 
			width : 400,
			height: 500,
			cw : 31,
			gameSpeed: 50,
			root:''
			
		},
		
		
		lang: {
			textSelectAll: function () { return "Select all"; }
		},
		

		
		
		

		_init: function() {
			// Introduce defaults that can be extended either 
			// globally or using an object literal. 
			
			//

			this.config = $.extend({}, this.defaults, this.options, 
			this.metadata);

			//this.lang = $.extend({}, this.lang, $.fn.seleqt.lang );
			
			//if( !this.config.placeHolder )
			//this.config.placeHolder = this.lang.textSelectResult()
			
			//if( !this.config.ajaxUrl )
			//this.allLoaded = true
			//alert( JSON.stringify( this.config.placeHolder  ) )
			//alert( JSON.stringify( this.lang.textSelectResult()  ) )
			//alert( JSON.stringify( this.lang.textSearching() ) )
			//alert(KEY.TAB)
			//alert( this.config.maximumInputLength )
			//alert( JSON.stringify(this.defaults)  )
			// Sample usage:
			// Set the message per instance:
			// $('#elem').plugin({ message: 'Goodbye World!'});
			// or
			// var p = new Plugin(document.getElementById('elem'), 
			// { message: 'Goodbye World!'}).init()
			// or, set the global default message:
			// Plugin.defaults.message = 'Goodbye World!'
			
			//if( $.isSubstring("hello world", "world")) ) // true;​​​​​​​​​​​
			//alert(1)

			
			
			//alert()
			var self = this
			
			
			this.cw = this.config.cw;	// cell width
			
			this.canvasWidth = this.config.width 		// canvas width
			this.canvasHeight = this.config.height 		// canvas height
			
			// resize canvas to fit the points
			if( this.config.width % this.cw != 0)
			this.canvasWidth = this.config.width + ( this.cw - ( this.config.width % this.cw ) )		// canvas width
			if( this.config.height % this.cw != 0)
			this.canvasHeight = this.config.height + ( this.cw - ( this.config.height % this.cw ) )		// canvas height
			
			//alert(this.config.width)
			//alert( this.cw - ( this.config.width % this.cw ) )
			
			this.cpw = Math.floor( this.canvasWidth / this.cw );	// cells per canvas width 
			this.cph = Math.floor( this.canvasHeight / this.cw );	// cells per canvas height 
			this.timer = []
			
			
			//$(".pt").css('width','5px !important')
			
			//cpw = 10
			//cph = 10
			//alert(cnw)
			//var dh;			// head direction
			//var dt;			// tail direction
			//var food;		
			this.score;
			this.fallenCount;
			this.speed = 20;
			this.level;
			//this.isPaused = false;
			
			this.processing = false;
			
			
			//this.game_loop = null;
			//var speedTemp = false;
			
			//this.rt = 0;
			//var l_tpl = []
				
			this.masks = {
					
					'0' : { 'xy': [[0,1,0],[1,1,1]]  },
					'1' : { 'xy': [[1,1],[1,1]]  },
					'2' : { 'xy': [[1,1,0],[0,1,1]]  },
					'3' : { 'xy': [[1,0,0],[1,1,1]]  },
					'4' : { 'xy': [[1,1,1,1]]  },
					
					'5' : { 'xy': [[1,0,1],[1,1,1]]  },	
					'6' : { 'xy': [[1,1,1],[1,0,1],[1,1,1]]  },
					'7' : { 'xy': [[1,0,1],[1,0,1],[1,1,1]]  },
					
					'8' : { 'xy': [[1,1,1],[0,1,0],[1,1,1]]  },
					'9' : { 'xy': [[0,1,0],[1,1,1],[0,1,0]]  },
					'10' : { 'xy': [[0,1,1],[1,1,0],[0,1,1]]  },
					'11' : { 'xy': [[0,1,0],[0,1,0],[1,1,1]]  },
					
					'9' : { 'xy': [[1,1,1,1,1] ] },
					'10' : { 'xy': [[1,1,1,1,1,1] ]  },
					
					'12' : { 'xy': [[0,1,1,0],[1,1,1,1],[1,1,1,1],[0,1,1,0] ]  },
					'13' : { 'xy': [[1,1,1,1],[1,0,0,1],[1,0,0,1],[1,1,1,1] ]  },
					'14' : { 'xy': [[0,0,0,1],[0,0,1,0],[0,1,0,0],[1,0,0,0] ]  },
					'15' : { 'xy': [[0,0,0,1],[1,1,1,1],[1,1,1,1],[1,0,0,0] ]  },
					
					'16' : { 'xy': [[0,0,1,0,0],[0,1,1,1,0],[1,1,1,1,1],[0,1,1,1,0],[0,0,1,0,0] ]  },
					'17' : { 'xy': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1] ]  },
					'18' : { 'xy': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,1,1,1] ]  },
					'19' : { 'xy': [[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,0],[1,1,1,1,1] ]  },
					'20' : { 'xy': [[1,1,1,1]]  },
					//'20' : { 'xy': [[1,1,1,1,0],[1,1,1,0,1],[1,1,0,1,1],[1,0,1,1,1],[0,1,1,1,1] ]  }
					
					
					
					}
					//alert( JSON.stringify( lx ) )

					
					
							 
				
			//if(dh == "right") 
			
			//this.cell_img = []
			
			//this.cell_img[ 0 ]='url(img/brick_empty.png)';
			//this.cell_img[ 1 ]='url(img/brick_full.png)';
			//this.cell_img[ 2 ]='url(img/wall.png)';
			//this.cell_img[ 3 ]='url(img/brick_full.png)';
			//this.cell_img[ 4 ]='url(img/brick_full.png)';
			//this.cell_img[ 5 ]='url(img/brick_full.png)';
			//cell_img[ 3 ]=document.getElementById("head2");
			
			//Lets create the snake now
			
			//this.sl = 4; // init snake length
			
			this.canvasField = []; //an array of cells to make up the wall
			this.fallingPiece = []; //an array of cells to make up the snake
			this.nextPiece = false; //an array of cells to make up the snake
			//var fastPiece = false; //an array of cells to make up the snake
			
			
			//for(var i = 0; i < cph; i++)
			var menu_width = self.canvasWidth > self.canvasHeight ? self.canvasHeight : self.canvasWidth
			menu_width = menu_width - 50
			this.theme = 1
			this.themePath = this.config.root + "img/themes/"+this.theme+"/"
			//alert(self.themePath+"brick_empty.png")
			
			var randid = "wrap_"+this.getRandomInt(1,99999)
			//alert(randid)
			
			this.$elem.wrap( "<div id='"+randid+"'></div>" )
			randid = '#'+randid
			
			this.$elem.prepend(
					 "<style>"
				//	+".canvasDiv{ position:relative; width: "+self.canvasWidth+"px; height: "+self.canvasHeight+"px; background:#DDD; background-size: "+self.cw+"px "+self.cw+"px; }" 
				//	+".canvasDivBg{ background-image: url("+self.themePath+"brick_empty.png); }" 
					
				//	+".menu{ z-index:9999; position: absolute; margin:auto; background:orange; width: "+(menu_width)+"px; height: "+(menu_width)+"px; top:0; bottom:0; left:0; right:0; }"
				//	+".menuHead{ padding:5px 10px; background:green; color:white }"
				//	+".menuBody{ padding: 4% 4%;  height: 92%; width: 92%;  overflow:hidden; }"
				//	+".menuBodyInner{ height: 88%; width: 100%; overflow:auto;  }"
				//	+".menuBack{  float:right }"
				//	+".menuBack:hover{  cursor:pointer;}"
				//	+".menu ul{ list-style-type:none; }"
				//	+".menu ul li.menuItem:hover{ cursor:pointer; text-decoration:underline }"
					
					
					+randid+" .gameDiv{ position:relative; }" 
					+randid+" .canvasDiv{ background: #DDD; background-size: "+self.canvasWidth+"px "+self.canvasHeight+"px; position:relative; width: "+this.canvasWidth+"px; height: "+this.canvasHeight+"px;   }" 
					+randid+" .canvasDivBg{ background-image: url("+self.themePath+"brick_empty.png); background-size: "+self.cw+"px "+self.cw+"px; }" 
					
					+randid+" .gameInfo{ position:absolute; top:0; left:0; margin-left:-85px; }" 
					+randid+" .gamePause{ cursor:pointer;  }" 
					+randid+" .gamePause:hover{ cursor:pointer; color:#FFF; background: #000; }" 
					+randid+" .player{ margin-bottom:5px; font-size:10px; width:80px; display:block; overflow:hidden; }" 
					+randid+" .infoPlayer, .points, .lives{ padding:3px; margin:3px; color: #FFF;}" 
					+randid+" .points, .lives{ font-size:8px; text-align:right; background: black;}" 
					+randid+" .pausePlayer, .destroyPlayer{ color:#FFF; cursor:pointer;margin-left:5px; }" 
					 
					
					+randid+" .menu{ z-index:9999; position: absolute; margin:auto; background:orange; width: "+(menu_width)+"px; height: "+(menu_width)+"px; top:0; bottom:0; left:0; right:0; }"
					+randid+" .menu .menuHead{ padding:5px 10px; background:green; color:white }"
					+randid+" .menu .menuBody{ padding: 4% 4%;  height: 92%; width: 92%;  overflow:hidden; }"
					+randid+" .menu .menuBodyInner{ height: 88%; width: 100%; overflow:auto;  }"
					+randid+" .menu .menuBack{ text-align:center; padding:5px; margin: 0 auto; width:100px; background:green; color:white;  }"
					+randid+" .menu .menuBack:hover{  cursor:pointer;}"
					+randid+" .menu .menuHtml{  display:none;  }"
					+randid+" .menu .menuHtml table{  margin:0;  }"
					+randid+" .menu .menuHtml table tr{  background:none;  }"
					+randid+" .menu .menuHtml table td{  border:none;  }"
					+randid+" .menu .menuHtmlInner{  padding:10px 0; border-bottom:1px solid green; border-top:1px solid green; }"
					+randid+" .menu .menuTitle:hover{  cursor:pointer; text-decoration:underline}"
					+randid+" .menu .menuTitleActive { padding:5px 10px; background:green; color:white; }"
					+randid+" .menu .menuTitleActive:hover {  text-decoration:none }"
					
					
					
					+randid+" .pt{float:left; width: "+(self.cw)+"px; height: "+(self.cw)+"px; background-image: url("+self.themePath+"brick_empty.png); background-size: "+self.cw+"px "+self.cw+"px; " 
					+"	  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+self.themePath+"brick_empty.png',sizingMethod='scale') !important; " 
					+"	  -ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+self.themePath+"brick_empty.png\",sizingMethod=\"scale\")' !important; }" 
					//+".pti{ background-image: url("+self.themePath+"brick_empty.png); background-size: "+self.cw+"px "+self.cw+"px;  }"
					
					+randid+" .c0{background-image:url("+self.themePath+"brick_empty.png) !important; "
					+"	  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+self.themePath+"brick_empty.png',sizingMethod='scale') !important; " 
					+"	  -ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+self.themePath+"brick_empty.png\",sizingMethod=\"scale\")' !important; }" 
					
					+randid+" .c1{background-image:url("+self.themePath+"brick_full.png) !important; "
					+"	  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+self.themePath+"brick_full.png',sizingMethod='scale') !important; " 
					+"	  -ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+self.themePath+"brick_full.png\",sizingMethod=\"scale\")' !important; }" 
					
					
					+randid+" .c2{background-image:url("+self.themePath+"wall.jpg) !important; "
					+"	  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+self.themePath+"wall.png',sizingMethod='scale') !important; " 
					+"	  -ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+self.themePath+"wall.png\",sizingMethod=\"scale\")' !important; }" 
					
					+randid+" .c3{background-image:url("+self.themePath+"running.png) !important; "
					+"	  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+self.themePath+"running.png',sizingMethod='scale') !important; " 
					+"	  -ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+self.themePath+"running.png\",sizingMethod=\"scale\")' !important; }" 
					
					+randid+" .c4{background-image:url("+self.themePath+"move.png) !important; "
					+"	  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+self.themePath+"move.png',sizingMethod='scale') !important; " 
					+"	  -ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+self.themePath+"move.png\",sizingMethod=\"scale\")' !important; }" 
					
					+randid+" .c5{background-image:url("+self.themePath+"move_not.png) !important; "
					+"	  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+self.themePath+"move_not.png',sizingMethod='scale') !important; " 
					+"	  -ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+self.themePath+"move_not.png\",sizingMethod=\"scale\")' !important; }" 
					
					+randid+" .c6{background-image:url("+self.themePath+"rotate1.png) !important; "
					+"	  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+self.themePath+"rotate1.png',sizingMethod='scale') !important; " 
					+"	  -ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+self.themePath+"rotate1.png\",sizingMethod=\"scale\")' !important; }" 
					
					+randid+" .c7{background-image:url("+self.themePath+"rotate2.png) !important; "
					+"	  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+self.themePath+"rotate2.png',sizingMethod='scale') !important; " 
					+"	  -ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+self.themePath+"rotate2.png\",sizingMethod=\"scale\")' !important; }" 
					
					+randid+" .c8{background-image:url("+self.themePath+"rotate3.png) !important; "
					+"	  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+self.themePath+"rotate3.png',sizingMethod='scale') !important; " 
					+"	  -ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+self.themePath+"rotate3.png\",sizingMethod=\"scale\")' !important; }" 
					
					+randid+" .c9{background-image:url("+self.themePath+"rotate4.png) !important; "
					+"	  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+self.themePath+"rotate4.png',sizingMethod='scale') !important; " 
					+"	  -ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+self.themePath+"rotate4.png\",sizingMethod=\"scale\")' !important; }" 
					
					+randid+" .c10{background-image:url("+self.themePath+"rotate_not.png) !important; "
					+"	   filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+self.themePath+"rotate_not.png',sizingMethod='scale') !important; " 
					+"	   -ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+self.themePath+"rotate_not.png\",sizingMethod=\"scale\")' !important; }" 
					
					+"</style>")
				
			var html = ''
				html += '<div class=gameDiv>'
				html += '<div class=canvasDiv>'
				html += '</div>'
				html += '<div class=gameInfo>'
				html += '</div>'
				html += '</div>'
			

			
			this.$elem.append( html )
			
			
			
			
			
			this.isPaused = true
			this.isRunning = false;
			
			this.toggleMenu()
			this.setLoop( );
			
			
			
			this._initEvents();
						
			
			return this;
		},

		_parseInt: function(a)
		{
			var b = parseInt(a)
			if(b)
			return b
			return false
		},
		
		menuItem : function( items, title, action, html, cls  )
	{
		var itms = ''
		
		if(cls)
		cls = " "+cls
		else
		cls=""
	
		itms += "<div class='menuItem"+cls+"' data-action='"+action+"'>"
		itms += "<div class='menuTitle'>"
		itms += title
		itms += "</div>"
		
		itms += items
		itms += "<div class='menuHtml'>"
		itms += "<div class='menuHtmlInner'>"
		itms += html
		itms += "</div>"
		itms+= "<div class='menuBack'>Späť</div>";
		
		itms += "</div>"
		
		itms += "</div>"
		
		return itms 
	},
	

		menuItems : function( items  )
	{
		var itms = "<div class='menuItems'>"
		
		
		for(var i = 0; i< items.length; i++ )
		{
			//itms += "<li class='menuItem' data-action='"+items[i].action+"'>" + items[i].title 
			var childitems = ''
			if( items[i].items && items[i].items.length > 0)
			{
			
				childitems = this.menuItems( items[i].items )
			}
			var action = ''
			var html = ''
			var cls = ''
			if(items[i].action) action = items[i].action
			if(items[i].html) html = items[i].html
			if(items[i].cls) cls = items[i].cls
			itms += this.menuItem(childitems, items[i].title, action, html, cls)
			
			//itms += "</li>"
		}
		itms += '</div>'
		
		return itms;
	},
	
	menuTpl : function(h,b,isChild,i)
	{
		var items = '';
		
		items += "<div class='menu menu"+i+"'>";
		items += "<div class='menuHead'>";
		items += h;
		if(isChild)
		items += "<div class='menuBack'>Späť</div>";
		
		items += '</div>';
		items += "<div class='menuBody'>";
		items += "<div class='menuBodyInner'>";
		items += b;
		items += '</div>';
		items += '</div>';
		//items += '<ul class="">';
		//items += '<li class="newGame">Nova hra</li>';
		//items += '<li class="resumeGame" style="display:none;">Pokracovat v hre</li>';
		//items += '<li class="newGame">Nastavenia</li>';
		//items += '<li class="newGame">Pravidla</li>';
		//items += '<li class="newGame">O hre</li>';
		//items += '</ul>';
		items += '</div>';
				
		return items
	
	},
	
	
	renderSelect: function(cls, values, defVal)
	{
		var items = ''
		var selected
		var id
		//alert(value)
		items += "<select class='"+cls+"'>";
		for(var i=0; i < values.length; i++)
		{
			id = values[i].id
			selected = ''
			if(defVal == id)
			selected = 'selected'
			items += "<option data-id='"+id+"' "+selected+">";
			items += values[i].text;
			items += "</option>";
		}
		items += "</select>";
		return items;
	},
	
	
	toggleMenu : function()
	{
		var self = this
		//if(show)
	
		
		
		
		{
			if( self.$elem.find('.menu').length > 0 
			//if( resume 
				 )
			
			{
			//alert(1)
			//self.$elem.find('.menu').fadeToggle(500)
			//if (!self.isPaused && self.isRunning)
			if(self.$elem.find('.menu').is(':hidden'))
			self.$elem.find('.menu').show()
			else
			self.$elem.find('.menu').hide()
			//self.$elem.find('.menu').fadeOut(500, function(){ $(this).remove()})
			}
			else
			{
			var mitems = [
						  //{title:'Nova hra', action: 1, items:[{title:'Title 1-1', items:[{title:'Title 1-2'}]}] }
						  
						  {title:'Nová hra', action: 1}
						 ,{title:'Pokračovať v hre', action: 2}
						 ,{title:'Ovládanie hry', html:'<ul><li>LEFT posun vľavo</li><li>RIGHT posun vpravo</li><li>UP rotácia </li><li>DOWN zrýchlenie </li></ul>'}
						 //,{title:'Nastavenia', html:'<div class="settings">Rýchlosť <input class="speed" value="'+this.speed+'" /> <button>save</button></div>'}
						 ,{title:'Nastavenia', html:"<table class='settings'><tr> <td>Rýchlosť hry</td> <td>"+this.renderSelect('gameSpeed', [{id:50, text:'slimačia'},{id:20, text:'pomalá'},{id:15, text:'stredná'}, {id:10, text:'rýchla'}, {id:5, text:'megarýchla'}, {id:3, text:'urýchľovač častíc'}, {id:1, text:'rýchlosť svetla'} ], this.config.gameSpeed)+" </td>   </tr> </table>"}
						 
						 ,{title:'Pravidlá', html:'Bloky skladajúce sa zo štvorčekov, padajú po obrazovke a hráč ich ukladá do múru od dolného konca hracej plochy. Keď je riadok plný štvorčekov bez dier, zmizne. Hráč sa snaží čo najďalej odmazávať riadky. Hra končí, keď múr dosiahne horný okraj hracej plochy.'}
						 ,{title:'O hre', html:'Tetris je počítačová hra, ktorú vyvinul sovietsky vedec Alexej Pažitnov, keď pracoval na moskovskej Akadémii vied Sovietskeho zväzu, inšpirovaný stolnou hrou pentomino. Verejnosti bola hra predstavená 6. júna 1984. Slovo Tetris pochádza z gréckeho slova tetra, teda štyri.'}
						 //,{title:'Title3', items:[{title:'Title 3-1'},{title:'Title 3-2'},{title:'Title 3-3'}]}
						// ,{title:'Title4'}
						 ];
			
			var ritems = self.menuItems( mitems )
			
			
			var items = self.menuTpl('Hlavné menu', ritems, false, 0)
			
			for(var i=0; i<mitems.length; i++)
			{
			//if(mitems[i].html)
			//items += self.menuTpl( mitems[i].title, mitems[i].html, true, i+1)
			}
			
			
			var menu = $( items )
			self.$elem.find('.canvasDiv').append( menu )
			menu.hide().fadeIn(500)
			}
		}
		
		if(self.isRunning)
		self.$elem.find('.menuItems .menuItem[data-action="2"]').show()
		else
		self.$elem.find('.menuItems .menuItem[data-action="2"]').hide()
		//if(resume)
		//self.$elem.find('.resumeGame').show()
		//else
		//self.$elem.find('.resumeGame').hide()
		////else
		{
			//self.$elem.find('.menu').fadeToggle(500)
			
		}
	},
	


	
		_initEvents : function(){
		//Lets add the keyboard controls now
			var self = this
			
			//self.$elem.on( 'keydown', document, function(e) 
			//{
			$(document).keydown( function(e){
				
				//alert( $('input').is(':focus') )
				//if( $('input').is(':focus') )
				//return
				var key = e.which;
				
				if( !self.isRunning || (self.isPaused && key != KEY.P) )
				return
				
				e.preventDefault()
				
				
				
				//console.log(key)
				//alert(key)
				//We will add another clause to prevent reverse gear
				
				//if(check_aside_collision())
				//	console.log('wall aside ???')
				
				//if( key == KEY['0']   ) 		// left key pressed
				//console.log(key)
				//alert(KEY['0'])
				gameControls(key)
				
			
				
				
				
				//The snake is now keyboard controllable
			})
			
			
			self.$elem.on('click', '.menuTitle', function(){
				//alert('start game')
				var mItem = $(this).closest('.menuItem')
				var action = mItem.data('action')
				var html = mItem.data('html')
				var title = mItem.text()
				
				if(!action)
				{
					//var menu = $( self.menuTpl( title, html, true) )
					//$(this).closest('.menu').append( menu )
					//menu.hide().fadeIn(500)
					$('.menuItem').hide()
					mItem.show()
					mItem.find('.menuHtml').fadeIn(500)
					mItem.find('.menuTitle').addClass('menuTitleActive')
					//alert(html)
				}
				else
				{
					if(action == '1')
					{
					
					self.resetGame();
					self.isPaused = false
					self.isRunning = true;
					}
					else if(action == '2')
					{
					self.isPaused = false
					self.toggleMenu(true)
					}
					else if(action == '3')
					{
					self.config.snakeCount = 8
					self.config.snakeCountAi = 8
					self.config.gameSpeed = 1
					self.config.allowGrowing = 0
					self.config.snakeLives = 1000
					self.resetGame();
					self.isPaused = false
					self.isRunning = true;
					}
				}
			})
		
			self.$elem.on('click', '.menuBack', function(){
				
				//$(this).closest('.menu').fadeOut( 500, function(){ $(this).remove()})
				//self.resetGame();
				var mItem = $(this).closest('.menuItem')
				//self.isPaused = false
				//$('.menuItem').each( function(){ $(this).show()})
				$('.menuItem').fadeIn(500)
				//mItem.hide()
				mItem.find('.menuHtml').hide()
				mItem.find('.menuTitle').removeClass('menuTitleActive')
				
				if(self.isRunning)
				self.$elem.find('.menuItems .menuItem[data-action="2"]').show()
				else
				self.$elem.find('.menuItems .menuItem[data-action="2"]').hide()
				//$(this).show()
				//$(this).find('.menuHtml').fadeIn(500)
				
			})
			
			
			self.$elem.on('change', 'select', function(){
			
				var el = $(this)
				var val = el.val()
				var cls = el.attr('class')
				var id = el.find(':selected').data('id')
				
				//alert()
				//if(el.hasClass('snakeCount'))
				self.config[ cls ] = 1 * id
				
			})
			
			$(document).on('click', '.settings button', function(){
			//alert('aaa')
				//$('.setting').each(function(){
				
				//var key = $(this).data('key')
				//alert( $('.speed').val() )
				//self[ key ] = 2
				//})
				//self.speed = 1 * $('.speed').val()
				//self.$elem.data('speed', 2)
				
				
				//self.speed = 4
			})
			
			//clickHold('button', function(){ console.log(123) }, 10)
			

		
			
			
			$(document).on('click', '.newGame', function(){
				
				//self.resetGame();
				//self.isPaused = false
			})
			
			
			$(document).on('click', '.resumeGame', function(){
				//alert('start game')
				//self.resetGame();
				
			})
			
			$('.ctrl2').click(function(){
			
			var key = $(this).data('key')
			//alert(key)
			gameControls(key)
			
			})
			
			clickHold( '.ctrl', function(el){
			
			//alert(key)
			var key = el.data('key')
			
			gameControls(key)
			

			}, 100 )

			
			
			function gameControls(key)
			{
			
			//function ctrlMousedown(key)
			
			
				//if(!isDown) { return; }
			//alert(456)
				if( key == KEY.LEFT || key == KEY.A  ) 		// left key pressed
				{
					
					
					
					//alert(fallingPiece.w)
					//if( ! wall_left() && !check_aside_collision('left') )
					self.movePiece(-1)
				}
				else if( key == KEY.RIGHT || key == KEY.D ) 
				{
					
					self.movePiece(1)
					
				}
				else if(key == KEY.P )	// p - pause
				{
					//alert('a')
					self.isPaused = !self.isPaused
					
					self.toggleMenu(true)
					
					
					
				}
				else if(key == KEY.ESC )	// escape
				{
				 self.createPiece( self.config.gameSpeed )
				}
				else if( key == KEY.UP || key == KEY.W )	// up arrow
				self.rotatePiece()
				else if( key == KEY.DOWN || key == KEY.S)	// down arrow
				self.fastMoving()
				
				//if (isDown)
				 
				
			
			
			}

			
			  function log(a)
			  {
			  //console.log(a)
			  }
			  
			  // $("#tetris")
			   /*
			   self.$elem.swipe( {
				tap:function(event, target) {
								log("tap from callback");
						
						
				},
				hold:function(event, target) {
								log("hold from callback");
				},
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				  log("swipe from callback");
				  
					
					
				},
				swipeLeft:function(event, distance, duration, fingerCount, fingerData) {
				  log("swipeLeft from callback");
				},
				swipeRight:function(event, distance, duration, fingerCount, fingerData) {
				  log("swipeRight from callback");
				},
				swipeUp:function(event, distance, duration, fingerCount, fingerData) {
				  log("swipeUp from callback");
				},
				swipeDown:function(event, distance, duration, fingerCount, fingerData) {
				  log("swipeDown from callback");
				},
				swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData) {
					log("swipeStatus from callback");
					
					if(direction)
					{
					var d = direction.toUpperCase()
					gameControls( KEY[ d ] )
					}
					
					//alert( direction.toUpperCase() )
					//var key = false
					//if(direction == "left")
					//key = KEY.LEFT
					//else if(direction == "right")
					//key = KEY.RIGHT
					//else if(direction == "up")
					//key = KEY.UP
					//else if(direction == "down")
					//{
					//	key = KEY.DOWN
					//	//self.fastMoving()
					//}
					
					
					//self.setLoop(1)
					//if(direction == "left" && dh != "right") dh = "left";
					//else if(direction == "up" && dh != "down") dh = "up";
					//else if(direction == "right" && dh != "left") dh = "right";
					//else if(direction == "down" && dh != "up") dh = "down";
					
					//alert(direction)		
				},
				pinchIn:function(event, direction, distance, duration, fingerCount, pinchZoom, fingerData) {
				  log("pinchIn from callback");
				 
				},
				pinchOut:function(event, direction, distance, duration, fingerCount, pinchZoom, fingerData) {
								log("pinchOut from callback");
				},
				pinchStatus:function(event, phase, direction, distance , duration , fingerCount, pinchZoom, fingerData) {
								log("pinchStatus from callback");
								
								 
				}
				//,fingers:$.fn.swipe.fingers.ALL 
			  });
				*/
		
		
		
		},



//var a = ['a', 'a', 'a'];
//var b = a.allValuesSame(); //true

	gameOver : function()
	{
		var self = this
		
		self.isPaused = true
		self.isRunning = false;
		
		self.$elem.find('.canvasDiv').html('')	
		self.$elem.find('.canvasDiv').removeClass( 'canvasDivBg' )
		//this.$elem.find('.gameInfo').html( '' )
		self.toggleMenu()
		
	},
	
	
	
	
	
	
	
	fastMoving: function()
	{
		var self = this
		
		if(self.fallingPiece.running)
		{
		self.fallingPiece.running = false;
		self.fallingPiece.speed = self.speed
		self.changePieceClass(1, false)
		//self.setLoop(  self.speed)
		}
		else
		{
		self.fallingPiece.speed = 2
		self.changePieceClass(3, false)
		self.fallingPiece.running = true;
		//self.setLoop(  70)
		}
	},
	
	
	resetGame : function()
	{
		//dh = "down";	//default direction of the head
		//dt = dh;		//default direction of the tail
		this.score = 0;
		this.fallenCount = 0;
		
		
		this.level = 1;
		this.frames = 0;
		
		this.nextPiece = false
		this.createCanvas();
		//alert(this.config.gameSpeed)
		this.createPiece( this.config.gameSpeed );
		
		
		
		//$("#level").text( this.level )
		//$("#fallenCount").text( this.fallenCount )
		//$("#score").text( this.score )
		
		var gameInfo = ''
			//gameInfo += "<div class='gamePause'>"
			//gameInfo += "Pauza"
			//gameInfo += "</div>"
			
			gameInfo += "<div>Spadlo <span class='fallenCount'>"+this.fallenCount+"</span></div>"
			gameInfo += "<div>Bodov <span class='score'>"+this.score+"</span></div>"

			gameInfo += "<div class='ctrl' data-key='37'>left</div>"
			gameInfo += "<div class='ctrl' data-key='38'>rotate</div>"
			gameInfo += "<div class='ctrl' data-key='39'>right</div>"
			gameInfo += "<div class='ctrl' data-key='40'>down</div>"
			gameInfo += "<div class='ctrl' data-key='80'>pause</div>"

			



			
			
		this.$elem.find(".gameInfo").html( gameInfo )	
		//create_food(); //Now we can see the food particle
		//finally lets display the score
		
		
		//alert(speed);
		//Lets move the snake now using a timer which will trigger the paint function
		//every 60ms
		//if(typeof game_loop != "undefined") clearInterval(game_loop);
		//if( game_loop !== false ) 
		//drawCell(1, 11, 4 );
		
		//setLoop(drawCanvas, speed);
	},
	
	 createCanvas: function(){
	
		var self = this
		
		$('#tetris').html("")
		this.$elem.find('.canvasDiv').html("")
		
		var ttl = 3000;
		//for(var i = cph-1; i>=0; i--)
		for(var i = 0; i< this.cph; i++ )
		{
			
			this.canvasField[i] = []
			//alert( JSON.stringify( canvasField[i]  ) )
			for(var j = 0; j< this.cpw; j++ )
			//for(var j = cpw-1; j>=0; j--)
			{
				ta = 0
				
				ttl = ttl - 5
				//console.log(ttl);
				//if( i==0 ) // top
				//ta = 3
				if(	  
					   i== this.cph-1 	// bottom
					|| j==0 		// left
					|| j== this.cpw-1		// right
					)
				ta = 2
				
				this.canvasField[i][j] = ta
				
				this.$elem.find('.canvasDiv').append("<div class='pt xy_"+j+"_"+i+" x"+j+" y"+i+"' ></div>")
				
				//getRandomInt(300,3000)
				//$( "#xy_"+j+"_"+i ).hide().fadeIn( ttl );
				this.$elem.find( ".xy_"+j+"_"+i ).hide().fadeIn( ttl );
				
				//console.log(ttl)
				//This will create a horizontal snake starting from the top left
				//canvasField.push({x: i+10, y:1});
				
			}
			
		}
		
		
		
		//self.$elem.find('.canvasDiv').css( 'background-image', 'none' )
		self.$elem.find('.canvasDiv').removeClass( 'canvasDivBg' )
		
		clearTimeout( this.timer['canvasDiv'] )
		this.timer['canvasDiv'] = setTimeout(function(){
		//self.$elem.find('.canvasDiv').css( 'background-image', "url("+self.themePath+"brick_empty.png)" )
		self.$elem.find('.canvasDiv').addClass( 'canvasDivBg' )
		}, 3000 )
		
		
		
		//$("#tetris").hide().fadeIn(1500)
		
		


			

		//console.log( JSON.stringify( this.canvasField  ) )
	},
	
	//init();
	
	setLoop: function( )
	{
	var self = this
	//clearInterval();
	//console.log()
	//if(speed > 0)
	//alert(1)
	//this.game_loop = setInterval(   self.drawCanvas(self), 0  );
	
	//requestAnimationFrame( self.drawCanvas(self) );
	
	
	 
	
	
	//return
			
			//(function() {
		  var onEachFrame;
		  if (window.webkitRequestAnimationFrame) {
			onEachFrame = function(cb) {
			  var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
			  //_cb();
			};
		  } else if (window.mozRequestAnimationFrame) {
			onEachFrame = function(cb) {
			  var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
			 // _cb();
			};
		  } else {
			onEachFrame = function(cb) {
			  //setInterval(cb, 1000 / 60);
			 
			}
		  }
		  
		  
		
			
		
		//})();

		
		 // window.onEachFrame = onEachFrame;
		//window.onEachFrame(  self.gameLoop()  );

//window.requestAnimFrame = (function(){
var requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function(callback, element){
           window.setTimeout(callback, 1000 / 60);
         };
})();




// usage:
// instead of setInterval(render, 16) ....

(function animloop(){

	if(!self.isPaused)
	self.gameLoop() 

	requestAnimFrame(animloop);
     
  // alert(156)
})();
// place the rAF *before* the render() to assure as close to
// 60fps with the setTimeout fallback.



	
	
	//this.game_loop = setInterval( function(){ self.drawCanvas(self)} , speed);
	//game_loop = setTimeout(paint, speed);
	},
	
	
	
	
	
	
	
	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution! Math.floor - uniform
	 */
	 getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},				 
	
	
	createPiece : function( speed )
	{
		this.fallenCount = this.fallenCount + 1
		this.$elem.find(".fallenCount").text( this.fallenCount )
		
		var max_i = 4
		//if(fallenCount % 10 == 0)
		//var max_i = 
		if( this.fallenCount % 10 == 0)
		{
		this.level = this.level + 1
		$("#level").text( this.level )
		max_i = max_i + Math.floor( this.fallenCount / 10)
		}
		
		//console.log( Math.floor(fallenCount / 5)  )
		//alert(speed)
		//max_i = max_i + Math.floor(fallenCount / 10)
		
		if(max_i > 15)
		max_i = 15
		
		min_i = 0
		max_i = 4
		
		//var ri = getRandomInt(7,9)
		
		//arr = lx[ri].xy
		
		//fallingPiece.xy = transpose( fallingPiece.xy  )
		
		//rt = 0 
		//console.log(ri)	
					 
		this.fallingPiece = {}; //Empty array to start with
		this.fallingPiece.xy = []; //Empty array to start with
		this.fallingPiece.running = false; //Empty array to start with
		//fallingPiece.w = masks[ri].w; //Empty array to start with
		//fallingPiece.h = masks[ri].h; //Empty array to start with
		//console.log(this.nextPiece)
		if( this.nextPiece ) 
		this.fallingPiece.mask = this.nextPiece
		else 
		{
			this.fallingPiece.mask = this.preparePieceMask(min_i, max_i)
		}
		
		
		this.nextPiece = this.preparePieceMask(min_i, max_i)
		
		
		
		this.fallingPiece.w = this.fallingPiece.mask[0].length; // piece width
		this.fallingPiece.h = this.fallingPiece.mask.length // piece height
		this.fallingPiece.r = 1 // piece rotation
		this.fallingPiece.speed = speed // piece speed
		
		//alert( masks[ri].h )
		//alert( fallingPiece.mask.length )
		
		for( var i = 0; i< this.fallingPiece.mask.length; i++ )
		{
			for( var j = 0; j< this.fallingPiece.mask[i].length; j++ )
			{
				//alert( i )
				if( this.fallingPiece.mask[i][j] == 1 )
				//this.fallingPiece.xy.push({x: j+6, y: i-this.fallingPiece.h+1, m: 1 });
				this.fallingPiece.xy.push({x: j+6, y: i-1, m: 1 });
			}
		}
		
		this.fallingPiece.l = this.fallingPiece.xy.length
		
		//alert(this.fallingPiece.l)
		//if(speed)
		//this.setLoop( speed );
		
		//fallingPiece.xy = reverseArray( fallingPiece.xy ) 
		//alert(fallingPiece)
		//arr = fallingPiece.xy
	},
	
	preparePieceMask : function(min_i, max_i)
	{
		var ri = this.getRandomInt(min_i,max_i)
		var gri = this.getRandomInt(0,3)
		var msk = this.masks[ri].xy;
		
		switch(gri)
		{
			case 0:
				return msk;
				break;
			case 1:
				return this.reverseArray( msk );
				break;
			case 2:
				return this.transposeArray( msk );
				break;
			default:
				msk = this.reverseArray( msk );
				return this.transposeArray( msk );
				break;
		}
		//return
	},

	//Lets paint the snake now
	gameLoop : function()
	{
		
		var self = this
		//alert(54)
		//alert()
		//To avoid the snake trail we need to paint the BG on every frame
		//Lets paint the canvas now
		//var loops = 0
		//ctx.fillStyle = "white";
		//ctx.fillRect(0, 0, w, h);
		//ctx.strokeStyle = "black";
		//ctx.strokeRect(0, 0, w, h);
		//var loops = 0, skipTicks = 1000 / 30,
		//  maxFrameSkip = 1000,
		//  nextGameTick = (new Date).getTime();
		
		
		//return function() 
		{
		
		
		
		
		
		
		//console.log ( loops ) 
		
		//if(self.frames % self.speed == 0)
		
		
		//run the updating code a fixed amount of times per second 
		if( self.frames % self.fallingPiece.speed == 0 )
		self.gameUpdate( )
		
		//run the drawing code as often as possible
		self.gameDraw()
		
		self.frames ++ ;
		//loops ++ ;
		
		}

		
		//var score_text = "Score: " + score + " Level: " + level;
		//ctx.fillStyle = 'black';
		//ctx.fillText(score_text, 20, h-20);
	},
	
	gameUpdate : function( )
	{
		var self = this
		
		
		//return
		
		
		
		
		
		
		
		
		
		
		if( self.checkCollision( 0, 1 )  )
		{
			
			// ensuring one row is removing one time 
			// mainly when the pieces are dropping too fast one after another 
			// and there are still rows fading out
			if(self.processing)	// removing (fading) full tetris rows
			return 
		
			var nx = self.fallingPiece.xy[0].x;
			var ny = self.fallingPiece.xy[0].y;
		
		
			//$( '.y22'  ).css('background','red !important')
			//console.log( JSON.stringify( canvasField   )  )
			//console.log( ny )
			//if( checkCollision( 3 ) )
			if( ny < 0 )
			{
				
				self.gameOver();
				
				
				//Lets organize the code a bit now.
				return;
				//alert(156)
			}
			//restart game
			//if(cph == )
			//alert(1)
			for(var i = 0; i < self.fallingPiece.l; i++)
			{
					var tx = self.fallingPiece.xy[i].x
					var ty = self.fallingPiece.xy[i].y
					var tm = self.fallingPiece.xy[i].m
					 //var c = fallingPiece[i];
					
					//if(!canvasField[tx])
					//canvasField[tx] = {}
					//if(!canvasField[tx][ty])
					//canvasField[tx][ty] = {}
					if(tm > 0)
					tm = 1
					//if(canvasField[ty])
					self.canvasField[ty][tx] = tm
					//canvasField[i].push(fallingPiece[i]) 
					//canvasField[i].x = fallingPiece[i].x
					//canvasField[i].y = fallingPiece[i].y
					//fallingPiece[i].y += 1
					
					//alert(fallingPiece[i].y)
				
			}
			
			
			var erows = []		// full rows to remove, array with y axis indexes
			
			//console.log('collision !')
			//alert(canvasField.length)
			
			//for(var l = 0; l < self.canvasField.length; l++)
			for(var l = 0; l < self.cph; l++)
			{
				
				//alert( JSON.stringify( canvasField[i]  ) )
				//for(var j = 0; j < canvasField[i].length; j++)
				//for(var j = cpw-1; j>=0; j--)
				{
					//if(canvasField[i][1] == 1 && canvasField[i].allValuesSame() )
					if(self.canvasField[l][1] > 0 && self.canvasField[l][1] != 2 
						&& self.canvasField[l].allValuesSame(1,self.cpw-1) )
					{
						
						erows.push( l )
							//$(this).show()
						//})
						
						
						
						
						//array.splice(index, 1);
						//console.log( JSON.stringify( canvasField   )  )
					}
					//This will create a horizontal snake starting from the top left
					//canvasField.push({x: i+10, y:1});
					//var c = canvasField[i][j];
					
					//if( c > 0 )
					//drawCell( j, i, c );
				}
				
			}
			
			
			if(erows.length > 0)
			{
			self.processing = true
			//ll = l
			$.each( erows , function(mm,ll){
			//alert(ll)
			//alert(mm)
			//$( '.y'+ll  ).not('.c2').each( function (e){ $(this).addClass('c3') }) 
			$( '.y'+ll  ).not('.c2').fadeOut(1000, function(){
				
				
				
					
				
						//alert(ll)
						
						//$( '.y'+ll  ).not('.c2').each( function (e){ $(this).removeClass('c3') })
						//$( '.y'+ll  ).each( function (e){ $(this).show() })
						//$( '.y'+ll   ).show()
						 
					$(this).show()	
							
			
			})  
			//$( '.y'+ll   ).fadeOut(1100)
			
			})
			
			
			
			setTimeout(function(){
			
				$.each( erows , function(mm,pos_y){
				
					//alert(ll)
						
						console.log('timeout: '+ pos_y)
						
							//$( '.y'+ll  ).not('.c2').each( function (e){ $(this).removeClass('c3') })
							//$( '.y'+ll  ).each( function (e){ $(this).show() })
							//$( '.y'+ll  ).not('.c2').show()
						//alert(l)
						
							// At position pos_y, remove 1 row from canvas field
							self.canvasField.splice(pos_y, 1); 
							var na = []
							//for(var j = cpw-1; j>=0; j--)
							//for(var k = 0; k < self.canvasField[0].length; k++)
							for(var k = 0; k < self.cpw; k++)
							na[k] = 0
							na[0] = 2
							na[ self.canvasField[0].length - 1 ] = 2
							
							// Add new row to the beginning of the canvas field:
							self.canvasField.unshift( na );
							//canvasField[j] = na
							self.score = self.score + 1
							self.$elem.find(".score").text( self.score )
						
						
							
						
						
						self.processing = false
			
				})	
				
				}, 1000   )
			


			
			}
			
		
							
							
							
			//init();
			self.createPiece( self.config.gameSpeed )
			
			//speed = speed - 10
			
			//Lets organize the code a bit now.
			//return;
		}
		else	// moving piece down if there is no collision 
		{
		
			//if( loops % self.fallingPiece.speed == 0 )
			for(var i = 0; i < self.fallingPiece.l; i++)
			{
				var c = self.fallingPiece.xy[i];
				
				self.fallingPiece.xy[i].y += 1
				
				//Lets paint 10px wide cells
				//var type = 1
				
			
			//self.drawCell( c.x, c.y, self.fallingPiece.xy[i].m );
			
			}
		
		}
		
		
	},
	
	
	gameDraw : function()
	{
		var self = this
		
		//console.log('draw')
		
		
		
		
		self.$elem.find('.pt')
			.removeClass(function() { 
				 var toReturn = '',
					 classes = this.className.split(' ');
				 for(var i = 0; i < classes.length; i++ ) {
					 if( /c\d/.test( classes[i] ) ) {   // Filters 
						 toReturn += classes[i] +' ';
					 }
				 }
				 return toReturn ; //  Returns all classes to be removed 
			});
			
			
			
			/*'c1' )
			.removeClass( 'c2' )
			.removeClass( 'c3' )
			.removeClass( 'c4' )
			.removeClass( 'c5' )
			.removeClass( 'c6' )
			.removeClass( 'c7' )
			.removeClass( 'c8' )
			.removeClass( 'c9' )
			.removeClass( 'c10' );
		*/
		
		
		
		//$('.pt').text("")
		//The movement code for the snake to come here.
		//The logic is simple
		//Pop out the tail cell and place it infront of the head cell
		
		//These were the position of the head cell.
		//We will increment it to get the new head position
		//Lets add proper direction based movement now
		//if(dh == "right") nx++;
		//else if(dh == "left") nx--;
		//else if(dh == "up") ny--;
		//else if(dh == "down") ny++;
		//
		 
		//console.log( JSON.stringify( canvasField ) )
		//Lets add the game over clauses now
		//This will restart the game if the snake hits the wall
		//Lets add the code for body collision
		//Now if the head of the snake bumps into its body, the game will restart
		//console.log( ny )
		//console.log( 1*ny + " - " + 1*cph - ( 1*fallingPiece.h ) )

		
		//Lets write the code to make the snake eat the food
		//The logic is simple
		//If the new head position matches with that of the food,
		//Create a new head instead of moving the tail

		//The snake can now eat the food.
		
		//fallingPiece.unshift(tail); //puts back the tail as the first cell
		
		//var ax = []
		//var ay = []
		
		// direction of the tail 
		//var sl = fallingPiece.xy.length
		//var x1 = fallingPiece.xy[ sl - 1 ].x
		//var y1 = fallingPiece.xy[ sl - 1 ].y
		//var x2 = fallingPiece.xy[ sl - 2 ].x
		//var y2 = fallingPiece.xy[ sl - 2 ].y
		
		//if(x1 == x2 && y1 > y2)
		//dt = 'up'
		//if(x1 == x2 && y1 < y2)
		//dt = 'down'
		///if(y1 == y2 && x1 < x2)
		//dt = 'right'
		//if(y1 == y2 && x1 > x2)
		//dt = 'left'
		//alert( x1 )
		//alert( x2 )
		//alert( JSON.stringify( canvasField[i]  ) )
		//if(self.frames % self.speed == 0)
		//for(var i = 0; i < self.canvasField.length; i++)
		for(var i = 0; i < self.cph; i++)
		{
			
			
			//for(var j = 0; j < self.canvasField[i].length; j++)
			for(var j = 0; j < self.cpw; j++)
			//for(var j = cpw-1; j>=0; j--)
			{
				//if(canvasField[i][1] == 1 && canvasField[i].allValuesSame() )
				//This will create a horizontal snake starting from the top left
				//canvasField.push({x: i+10, y:1});
				var c = self.canvasField[i][j];
				
				if( c > 0 )
				self.drawCell( j, i, c );
			}
			
		}
		
		
		
		
		
		
	
		
		
		
		for(var i = 0; i < self.fallingPiece.l; i++)
		{
			var c = self.fallingPiece.xy[i];
			
			//self.fallingPiece.xy[i].y += 1
			
			//Lets paint 10px wide cells
			//var type = 1
			
			
			self.drawCell( c.x, c.y, self.fallingPiece.xy[i].m );
			
		}
		
		
	
	
			
			
	},
	
	
	//Lets first create a generic function to paint cells
	drawCell : function(x, y, type )
	{
		//img = cell_img[ type ]
		//var pat=ctx.createPattern(img,"repeat");

		//ctx.drawImage(img, x*cw, y*cw, cw , cw );
		this.$elem.find('.xy_'+x+'_'+y).addClass( 'c'+ type );
		
		
		//document.getElementById( 'p_'+y+'_'+x ).className = 'pt';
		//document.getElementById( 'p_'+y+'_'+x ).className = 'pt c'+ type;
		
		
		//$('#p_'+y+'_'+x).css( 'background' , '#'+ type + type + type ) 
		//$('#p_'+y+'_'+x).css( 'background-image', img )
		//$('#p_'+y+'_'+x).text( type )
				
		//ctx.fillStyle = pat;
		//ctx.fillRect(x*cw, y*cw, cw, cw);
		//ctx.strokeStyle = "white";
		//ctx.strokeRect(x*cw, y*cw, cw, cw);
	},
	
	
	//ar1 = l_tpl[3][ 0 ]
	//console.log( JSON.stringify( fallingPiece.xy ) )
	//arr = []
	
	rotatePiece : function()
	{
		//var fallingPiece2 = []
		
		//rt = rt+1
		//if(rt % 4 == 0)
		//rt = 0
		
		//console.log( JSON.stringify( l_tpl[3][ rt ] ) )
		//console.log(rt)
		sw = this.fallingPiece.w
		sh = this.fallingPiece.h
		
		
		
		var ggg = this.getRandomInt(0,2)
		//var ri = getRandomInt(7,9)
		var msk = 1
		//arr = lx[ri].xy
		
		//fallingPiece.xy = transpose( fallingPiece.xy  )
		
		//rt = 0 
		//console.log(ri)	
					 
		//fallingPiece = {}; //Empty array to start with
		//fallingPiece.xy = []; //Empty array to start with
		//fallingPiece.w = masks[ri].w; //Empty array to start with
		//fallingPiece.h = masks[ri].h; //Empty array to start with
		
		if(ggg == 0)
		msk = 4
		else if( ggg == 1 )
		msk = 3
		else
		msk = 1
		
		msk = this.fallingPiece.xy[0].m
		//alert(1)
		//if(  
			//(wall_left() && sw < sh ) ||
			//check_rotate_collision()
		//	|| check_aside_collision()
         //   || check_aside_collision('left')
		//		)
		//
		//if( checkCollision( 2, -1, 0 ) || 
		//		checkCollision( 1, -1, 0 ) )
		//return false
		
		//old_arr = fallingPiece.xy
		
		mx= this.getMin('x')
		my= this.getMin('y')
		//console.log(mx)
		//console.log(my)
		//fallingPiece = {}
				
		//ltpl = []
		
		
		pivx = pivx2 = mx
		pivy = pivy2 = my
		
		//alert(pivx)
		//alert(pivx2)
		
		mm = sw
		//pq = 1
		if(sh > sw)
		{
		pivx = mx - Math.floor(sh/2) + 1
		pivy = my + Math.floor(sh/2) 
		mm = sh
		pivx2 = pivx
		}
		else if(sh < sw)
		{
		pivx = mx + Math.floor(sw/2) - 1
		pivy = my - Math.floor(sw/2)  
		pivy2 = pivy
		}
		
		
		// check if rotation is allowed
		for( var i =  pivy2  ; i < mm + pivy2   ; i++ )	// height
		{
			for( var j = pivx2 ; j < mm + pivx2 ; j++ )	// width
			{
				//if(canvasField[i][j] == 0)
				//canvasField[i][j] = 3
				
				if ( this.canvasField[i] && 
					( this.canvasField[i][j] != 0 )
					)
					{
				//return true
				//$('body').prepend('nie je mozna rotacia !!!')
					//alert('no')
					

					this.changePieceClass(10, 500)
					
					return false;
					}
			}
		}
		
		
		this.fallingPiece.xy = []	
		
		//console.log( JSON.stringify( ltpl ) )	
		//alert(arr.xy[0])
		//arx= lx[ fallingPiece['r'] ].xy
		//alert(fallingPiece['r'])
		
		
		
		this.fallingPiece['mask'] = this.transposeArray( this.fallingPiece['mask']  )
		this.fallingPiece['mask'] = this.reverseArray( this.fallingPiece['mask']  )
		
		//arr = transpose( arx  )
		
		this.fallingPiece.r = this.fallingPiece.r + 1
		if( this.fallingPiece.r > 4)
		this.fallingPiece.r = 1
		//for( var i = 0; i< l_tpl[3][ rt ].length; i++ )
		for( var i = 0; i < this.fallingPiece['mask'].length; i++ )
		{
			//for( var j = 0; j< l_tpl[3][ rt ][i].length; j++ )
			for( var j = 0; j < this.fallingPiece['mask'][i].length; j++ )
			{
				//alert( i )

				//piv = Math.round( piv / 2 )  
				 
				//piv2 = Math.floor( piv / 2 ) 

				
				
				//if(sh != sw)
				//pivx = mx + ( pq * Math.floor(sw/2) ) + 1
				
				//pivy = my-sw + Math.round( ( my ) /2 ) 
				//pivy = my-sw + 1 
				
				console.log( pivy + ' - ' + pivx )
				
				
				
				
				//mf = Math.floor(sh/2) 
				//console.log(mf)
				if( this.fallingPiece['mask'][i][j] == 1 )
				this.fallingPiece.xy.push({x: j+( pivx ), y: i+(pivy), m:msk });
				//fallingPiece.xy.push({x: j+( mx-sh+1 ), y: i+(my-sw+1) });
			}
		}		
			
		this.fallingPiece.w = sh
		this.fallingPiece.h = sw 
		
		
		this.changePieceClass( this.fallingPiece.r + 5 , 500)
		
		
		
		//setLoop(paint, false)
		//console.log( JSON.stringify( fallingPiece.xy ) )			
		//console.log(JSON.stringify(fallingPiece) )
		
		
			//fallingPiece.xy = fallingPiece2
			
			//sh = fallingPiece2.h
			//sw = fallingPiece2.w
			
			//fallingPiece.h = sw
			//fallingPiece.w = sh
		
	},
	
	
 transposeArray : function(a) {

  // Calculate the width and height of the Array
  var w = a.length ? a.length : 0,
    h = a[0] instanceof Array ? a[0].length : 0;

  // In case it is a zero matrix, no transpose routine needed.
  if(h === 0 || w === 0) { return []; }

  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i, j, t = [];

  // Loop through every item in the outer array (height)
  for(i=0; i<h; i++) {

    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for(j=0; j<w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  return t;
},
	

	
	 reverseArray : function( array ){

		var newArray = [];
		for(var i = 0; i < array.length; i++){
			newArray.push([]);
		};

		for(var i = 0; i < array.length; i++){
			newArray[i] = array[i].reverse();
		};

		return(newArray);
	},
	

	
	
	checkCollision : function( move_x , move_y )
	{
		//if(!tolerance_x)
		//tolerance_x = 0
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not

		
		
		for(var i = 0; i < this.fallingPiece.l; i++)
		{
			
			x = this.fallingPiece.xy[i].x + move_x
			y = this.fallingPiece.xy[i].y + move_y
			
					
			//console.log( fallingPiece.h )
			//console.log(canvasField[y][x])
			//alert(canvasField[x][y])
			//if ( canvasField[y] && canvasField[y][x] == cn )
			if ( this.canvasField[y] && this.canvasField[y][x] > 0  )
			return true
			
			
			
					
		}
		return false;
	},
	

	
	getMin : function( x_y )
	{
			var min = this.fallingPiece.xy[0][x_y]
			for(var i = 0; i < this.fallingPiece.l; i++)
			{
				//var c = fallingPiece[i];
				if(min > this.fallingPiece.xy[i][x_y])
				min = this.fallingPiece.xy[i][x_y] 
			}
			return min
	},
	
	


	
	
	movePiece : function ( ctrl ) // left or right moving
	{
		var tm 
		var self = this
		
		//console.log(this.fallingPiece.l)
		
		
		if( !this.checkCollision(  ctrl, 0 ) 
			//	&& !this.checkCollision(  ctrl, 0 ) 
			)
		{
			var epc = this.fallingPiece
			for(var i = 0; i < this.fallingPiece.l; i++)
			{
				x= this.fallingPiece.xy[i].x
				y= this.fallingPiece.xy[i].y
				//var c = fallingPiece[i];
				//$('#xy_'+x+'_'+y ) //.hide( function(){
				//.addClass('c3')
				//$(this).fadeIn(500)
				//})
				
				
				
				this.fallingPiece.xy[i].x = this.fallingPiece.xy[i].x + ctrl
				
				//fallingPiece.xy[i].m = 3
			}
			
			
			this.changePieceClass(4, 500)
		}
		else
		this.changePieceClass(5, 500)
		
	},
	
	
	 changePieceClass : function( cls, ms )
	{
		var self = this
		//var origMask = 1
		if(this.fallingPiece.running)
		{
		cls = 3;
		ms = false
		}
		
		for(var i = 0; i < this.fallingPiece.l; i++)
			{
				//x= fallingPiece.xy[i].x
				//y= fallingPiece.xy[i].y
				//var c = fallingPiece[i];
				//$('#xy_'+x+'_'+y ) //.hide( function(){
				//.addClass('c3')
				//$(this).fadeIn(500)
				//})
				
				
				
				//fallingPiece.xy[i].x = fallingPiece.xy[i].x + ctrl
				
				this.fallingPiece.xy[i].m = cls
			}
		
		if( ms )
		{
			clearTimeout(this.timer['changePieceClass'] )
			this.timer['changePieceClass'] = setTimeout(function(){

			//alert(JSON.stringify(epc))
			
			for(var i = 0; i < self.fallingPiece.l; i++)
			{
				//if(fallingPiece.xy[i].m != 3)
				if( !self.fallingPiece.running )
				self.fallingPiece.xy[i].m = 1
			}
			
			}, ms )
		}
		
		
	}
	
	
	
	  
	  
		
		
		
	}
		
    


    // You don't need to change something below:
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations and allowing any
    // public function (ie. a function whose name doesn't start
    // with an underscore) to be called via the jQuery plugin,
    // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
    $.fn[pluginName] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'plugin_' + pluginName)) {
					
                    // if it has no instance, create a new one,
                    // pass options to our plugin constructor,
                    // and store the plugin instance
                    // in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new tetrisPlugin( this, options ));
                }
            });

        // If the first parameter is a string and it doesn't start
        // with an underscore or "contains" the `init`-function,
        // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			
            // Cache the method call
            // to make it possible
            // to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof tetrisPlugin && typeof instance[options] === 'function') {
					//alert( options )
                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };

}(jQuery, window, document));
