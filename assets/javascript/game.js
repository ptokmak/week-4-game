
	var _warriorClicked = "";
	var _defenderClicked = "";
	var _attackCount=0;
	var _hasDefender=false;
	var _countDefender=0;
	var _countEnemy=0;
	var _countWarrior=0;
	
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
					$('#result_text').html('<p></p>')
				}
			}
			if ($(this).hasClass("restart"))
			{
				$('#top_level').html('<button class="warrior" value="Darth Wader" id="warrior1" data-healthPoint=100 data-attackPoint=8 data-counterAttack=20 data-image="darth01"><img src=assets/images/darth01.jpg><span>Darth Wader HP:100 </span></button>'+
					'<button class="warrior" value="Luke Skywalker" id="warrior2" data-healthPoint=140 data-attackPoint=6 data-counterAttack=9 data-image="luke01"><img src=assets/images/luke01.jpg><span>Luke Skywalker HP:140 </span></button>'+
					'<button class="warrior" value="Princess Leia" id="warrior3" data-healthPoint=150 data-attackPoint=9 data-counterAttack=15 data-image="leia01"><img src=assets/images/leia01.jpg><span>Princess Leia HP:150</span></button>'+
					'<button class="warrior" value="Obi Wan Kenobi" id="warrior4" data-healthPoint=120 data-attackPoint=7 data-counterAttack=11 data-image="obi01"><img src=assets/images/obi01.jpg><span>Obi Wan Kenobi HP:120 </span></button>');

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
				_attackCount=0;
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
						_attackCount++;
						var _defenderHP = $('#'+_defenderClicked).attr("data-healthPoint");
						var _defenderCounterAttack =$('#'+_defenderClicked).attr("data-counterAttack");
						_defenderHP=_defenderHP-(_warriorAttack*_attackCount);
						_warriorHP=_warriorHP-(_defenderCounterAttack);

						//update Health point for warrior and current defender
						$('#'+_warriorClicked).attr("data-healthPoint",_warriorHP);
						$('#'+_defenderClicked).attr("data-healthPoint",_defenderHP);

						//showing warrior's health, attack and counter attack values
						$('#'+_warriorClicked).html("<img src=assets/images/"+$('#'+_warriorClicked).attr("data-image")+".jpg><span>"+$('#'+_warriorClicked).attr("value")+
							" HP:"+$('#'+_warriorClicked).attr("data-healthPoint")+"</span>");

						// 4Adding result messages for Your Character section
						$("#result_text1").html("<p>"+"You attacked"+" "+$('#'+_defenderClicked).attr("value")+" "+"for"+" "+_warriorAttack*_attackCount+" "+"damage."+"</p>");

						//showing defender's health, attack and counter attack values
						$('#'+_defenderClicked).html("<img src=assets/images/"+$('#'+_defenderClicked).attr("data-image")+".jpg><span>"+$('#'+_defenderClicked).attr("value")+
							" HP:"+$('#'+_defenderClicked).attr("data-healthPoint")+"</span>");

						// Adding result messages for Your Character section -Updating
						$("#result_text2").html("<p>"+$('#'+_defenderClicked).attr("value")+ " "+"attacked you  back for"+" " +
							+_defenderCounterAttack+" "+"damage."+"</p>");


						if(_defenderHP<=0)
						{
							$('#'+_defenderClicked).remove();
							$('#result_text').html('<p>You defeated the defender.</p>')
						}
						else
						{
							$('#result_text').html('<p></p>')
						}
					}
					else
					{
						$('#result_text').html('<p><You have been defeated. Game over!</p>')
					}
				}
				else
				{
					_countEnemy=0;
					_countWarrior=0;
					$('#mid_level').children('button').each(function() 
					{
						if( $(this).hasClass("enemy") )
						{
							_countEnemy++;
						}
					});
					$('#top_level').children('button').each(function() 
					{
						_countWarrior++;
					});
					if(_countEnemy==0 && _countWarrior==1)
					{
						$('#result_text').html('<p>You defeated all enemies. You won!</p>')
					}
					if(_countEnemy>0 && _countWarrior>0)
					{
						$('#result_text').html('<p>Select your next defender.</p>')
					}
				}
			}			
		});
	});