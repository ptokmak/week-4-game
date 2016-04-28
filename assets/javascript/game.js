
	var _warriorClicked = "";
	var _defenderClicked = "";
	var _attakCount=0;
	var _hasDefender=false;
	var _countDefender=0;
	var _countEnemy=0;
	
	$(document).ready(function(){
		$('button').click(function(){
			if( $(this).hasClass("warrior") )
			{
				//warrior id
				_warriorClicked=this.id;
				//loops all the buttons inside of the div
				$('#top_level').children('button').each(function() 
				{
					if (this.id != _warriorClicked)
					{
						//moving other warriors to enemies line
						$(this).appendTo( $('#mid_level'));
						$(this).removeClass("warrior");
						$(this).addClass("enemy");
					}
				});
			}
			if( $(this).hasClass("enemy"))
			{
				_countDefender=0;
				$('#bottom_level').children('button').each(function() 
				{
					if( $(this).hasClass("defender") )
					{
						_countDefender++;
					}
				});
				if(_countDefender!=0)
				{
					$('#result_text').html('<p>You still have a defender.</p>')
				}
				else
				{
					//defender id
					_defenderClicked=this.id;
					$(this).appendTo($("#bottom_level"));
					$(this).removeClass("enemy");
					$(this).addClass("defender");
				}
			}
			if ($(this).hasClass("restart"))
			{
				$('#top_level').html('<button class="warrior" value="Darth" id="warrior1" data-healthPoint=100 data-attackPoint=8 data-counterAttack=20 data-image="darth01"><img src=assets/images/darth01.jpg><span>Darth HP:100 Attk: 8 CntAttk: 20</span></button>'+
					'<button class="warrior" value="Luke" id="warrior2" data-healthPoint=140 data-attackPoint=6 data-counterAttack=9 data-image="luke01"><img src=assets/images/luke01.jpg><span>Luke HP:140 Attk: 6 CntAttk: 9</span></button>'+
					'<button class="warrior" value="Leia" id="warrior3" data-healthPoint=150 data-attackPoint=9 data-counterAttack=15 data-image="leia01"><img src=assets/images/leia01.jpg><span>Leia HP:150 Attk: 9 CntAttk: 15</span></button>'+
					'<button class="warrior" value="Obi" id="warrior4" data-healthPoint=120 data-attackPoint=7 data-counterAttack=11 data-image="obi01"><img src=assets/images/obi01.jpg><span>Obi HP:120 Attk: 7 CntAttk: 11</span></button>');

				$('#mid_level').children('button').each(function() 
				{
					if( $(this).hasClass("enemy") )
					{
						$(this).remove();
					}
				});
				$('#bottom_level').children('button').each(function() 
				{
					if( $(this).hasClass("defender") )
					{
						$(this).remove();
					}
				});
				_warriorClicked = "";
				_defenderClicked = "";
				_attakCount=0;
				_hasDefender=false;
				_countDefender=0;
				_countEnemy=0;
				$('#result_text').html('<p></p>')
				location.reload();
			}
			//Adding Attack Button Properties
			if ($(this).hasClass("btnAttack"))
			{
				// console.log($('.defender').attr('data-healthPoint'))
				// console.log($('.warrior').attr('data-healthPoint'))
				_countDefender=0;
				_countEnemy=0;
				$('#bottom_level').children('button').each(function() 
				{
					if( $(this).hasClass("defender") )
					{
						_countDefender++;
					}
				});
				if( _countDefender !=0 )
				{
					_hasDefender=true;
					$('#result_text').html('<p></p>')
				}
				else
				{
					_hasDefender=false;
					$('#result_text').html('<p>Please select a defender</p>')
				}
				//When defender exist
				if(_hasDefender)
				{
					var _warriorHP=$('#'+_warriorClicked).attr("data-healthPoint");
					var _warriorAttack=$('#'+_warriorClicked).attr("data-attackPoint");
					if(_warriorHP>0)
					{
						_attakCount++;
						var _defenderHP = $('#'+_defenderClicked).attr("data-healthPoint");
						var _defenderCounterAttack =$('#'+_defenderClicked).attr("data-counterAttack");
						_defenderHP=_defenderHP-(_warriorAttack*_attakCount);
						_warriorHP=_warriorHP-(_defenderCounterAttack);
						//update Health point for warrior and current defender
						$('#'+_warriorClicked).attr("data-healthPoint",_warriorHP);
						$('#'+_defenderClicked).attr("data-healthPoint",_defenderHP);
						//showing warrior's health, attack and counter attack values
						$('#'+_warriorClicked).html("<img src=assets/images/"+$('#'+_warriorClicked).attr("data-image")+".jpg><span>"+$('#'+_warriorClicked).attr("value")+
							" HP:"+$('#'+_warriorClicked).attr("data-healthPoint")+
							" Attk:"+_warriorAttack*_attakCount+
							" CntAttk:"+$('#'+_warriorClicked).attr("data-counterAttack")+"</span>");
						//showing defender's health, attack and counter attack values
						$('#'+_defenderClicked).html("<img src=assets/images/"+$('#'+_defenderClicked).attr("data-image")+".jpg><span>"+$('#'+_defenderClicked).attr("value")+
							" HP:"+$('#'+_defenderClicked).attr("data-healthPoint")+
							" Attk:"+$('#'+_defenderClicked).attr("data-attackPoint")+
							" CntAttk:"+_defenderCounterAttack+"</span>");
						if(_defenderHP<=0)
						{
							$('#'+_defenderClicked).remove();
							$('#result_text').html('<p>Your warrior has defeated the defender.</p>')
						}
						else
						{
							$('#result_text').html('<p></p>')
						}
					}
					else
					{
						$('#result_text').html('<p>Your warrior has been defeated.</p>')
					}
				}
				else
				{
					$('#mid_level').children('button').each(function() 
					{
						if( $(this).hasClass("enemy") )
						{
							_countEnemy++;
						}
					});
					if(_countEnemy==0)
					{
						$('#result_text').html('<p>Your warrior has defeated all enemies. You won!</p>')
					}
				}
			}			
		});
	});