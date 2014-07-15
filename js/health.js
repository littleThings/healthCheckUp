$(function(){
	health.init();
});

var health = {
	init: function(){
		health.bind_addOther();
		health.bind_generateBtn();
		health.bind_rowClickCheck();
		health.bind_resetBtn();
		health.bind_comAnaBtn();
	},
	bind_comAnaBtn: function(){
		$('#sel-com-ana-btn').on('click',function(){
			$('.com-ana').prop({'checked': true});
			$(this).addClass('display-none');
			$('#de-sel-com-ana-btn').removeClass('display-none');
		});
		$('#de-sel-com-ana-btn').on('click',function(){
			$('.com-ana').prop({'checked': false});
			$(this).addClass('display-none');
			$('#sel-com-ana-btn').removeClass('display-none');
		});
	},
	bind_resetBtn: function(){
		$('#reset-btn').on('click',function(){
			if(confirm('確定要重置嗎？ 所有勾選項目將會被清空！')){
				location.reload()
			}
		});
	},
	bind_addOther: function(){
		$('#other-btn').on('click',function(){
			var otherItem = $('#other-input').val();
			if(otherItem === ''){
				alert('請輸入檢查項目');
			}
			else{
				$('#other-input').val('');
				$('#other-input').focus();
				var tmp = _.template($('#other-item-template').html(),{itemName: otherItem});
				$('#other-container').append(tmp);
				health.bind_removeBtn($('.other-el').last().find('button'));
			}
		})
	},
	bind_removeBtn: function(obj){
		$(obj).on('click',function(){
			$(this).parent().parent().remove();
		})
	},
	bind_generateBtn: function(){
		$('#generate-btn').on('click',function(){
			var tmp = NaN;

			$('#print-area').empty();

			//Add Name
			var personName = $('#object-name').val()
			$('#person-name').html(personName);

			//Count blood analysis
			var bloodAna_Arr = health._countCheckedItem($('.blood-analysis'));
			health._generate_append_Tmp('血液一般檢查',bloodAna_Arr);

			//Count liver analysis
			//var liverAna_arr = health._countCheckedItem($('.liver-analysis'));
			//health._generate_append_Tmp('肝機能檢查',liverAna_arr);
			
			//Count bio analysis
			var bioAna_arr = health._countCheckedItem($('.bio-analysis'));
			health._generate_append_Tmp('生化檢查',bioAna_arr);		

			//Count uric analysis
			var uricAna_Arr = health._countCheckedItem($('.uric-analysis'));
			health._generate_append_Tmp('尿液檢查',uricAna_Arr);

			//Count poo analysis
			var pooAna_Arr = health._countCheckedItem($('.poo-analysis'));
			health._generate_append_Tmp('糞便檢查',pooAna_Arr);

			//Count remaining analysis
			var remainingAna_Arr = health._countCheckedItem($('.remaining-analysis'));
			//health._generate_append_Tmp('其他',bloodAna_Arr);
			var otherAna_arr = [];
			$('.other-el').each(function(i,e){
				var anaName = $(e).find('span').html();
				otherAna_arr.push(anaName);
			});
			health._generate_append_Tmp('其他',otherAna_arr.concat(remainingAna_Arr));

			$('#print-area-container').printArea();

		});
	},
	bind_rowClickCheck: function(){
		$('.list-el').on('click',function(){
			var $checkBox = $(this).find('input');
			if($checkBox.prop('checked') === true){
				$checkBox.prop({'checked': false});
			}
			else{
				$checkBox.prop({'checked': true});				
			}
		});
		$('input').on('click',function(event){
			event.stopPropagation();
		})
	},
	_countCheckedItem: function(anaTypeObj){
		var returnArr = []
		$(anaTypeObj).each(function(i,e){
				if($(e).prop('checked') === true){
					var anaName = $(e).next().html();
					returnArr.push(anaName);
				}
		});
		return returnArr;
	},
	_generate_append_Tmp: function(anaTitle, itemList){
		if(itemList.length > 0){
			var tmp = _.template($('#print-area-template').html(),{anaTitle: anaTitle, itemList: itemList});
			$('#print-area').append(tmp);	
		}
	}
}