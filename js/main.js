$(function(){
	var model = {
		length: null,
		x: null,
		xarr: [],
		yarr: [],
		matrix: [],
		d: [],
		yDivd: []

	};

	var control = {
		setLength: function(tmp){
			model.length = tmp;
			control.pushMatrixLength(tmp);
		},

		getLength: function(){
			return model.length;
		},

		setXstar: function(tmp){
			model.x = tmp;
			console.log(model.x);
		},
		getXstar: function(){
			return model.x;
		},

		setX: function(length){
			for (var i=0; i<length; i++){
				model.xarr.push($('.x'+i+'>input').val());
			}
		},
		setY: function(length){
			for (var i=0; i<length; i++){
				model.yarr.push($('.y'+i+'>input').val());
			}
		},

		setTable: function(){
			view.readTable(model.length);
		},

		pushMatrixLength: function(length){
			for (var i=0; i<length; i++){
				model.matrix.push([]);
			}
		},

		calculateMatrix: function(length){
			for (var i = 0; i<length; i++){
				for (var j=0; j<length; j++){
				model.matrix[i][j] = (i==j)? (model.x-model.xarr[j]) : (model.xarr[i]-model.xarr[j]);
				}
			}

			for (var i = 0; i<length; i++){
				model.d[i] = 1;

				for (var j=0; j<length; j++){
				model.d[i] *= model.matrix[i][j];
				}
				model.yDivd[i] = model.yarr[i]/model.d[i];
			}
			console.log(model.matrix);
			console.log(model.d);
			console.log(model.yDivd);

		},

		getMatrix: function(){
			return model.matrix;

		},

		getD: function(){
			return model.d;
		},

		getYDivD: function(){
			return model.yDivd;
		},

		result: function(length){
			var sumd = 1;
			var sumYDivD = 0;
			for (var i = 0; i<length; i++){
				sumYDivD += model.yDivd[i]; 
			}

			for (var i = 0; i<length; i++){
				for (var j = 0; j<length; j++) {
					if (i==j) {
					sumd*= model.matrix[i][j];
					}
				}
			}
			console.log(sumd);
			console.log(sumYDivD);
			return sumd * sumYDivD;
		},

		init: function(){
			view.init();
		}
	};

	var view = {
		init: function(){
			this.i = $(".length");
			this.x = $(".x");
			this.table = $('.input-table');
			this.finalMatrix = $('.final-matrix');

		},

		lengthSubmit: $(".length-submit").click(function(){
			control.setLength(view.i.val());
			control.setXstar(view.x.val());
			view.renderTable(control.getLength());

		}),

		renderTable: function(count){
			
			var htmlstr = "<table><tr><td>i</td><td>x</td><td>y</td></tr>";
			for (var i = 0; i<count; i++){
				htmlstr+= "<tr><td>"+i+"</td><td class='x"+i+"'><input type='text'></td><td class='y"+i+"'><input type='text' ></td></tr>";
			}
			htmlstr += "</table><input type='button' class='submitTable' value='Продовжити'>";
			this.table.html(htmlstr);

		},

		readTable: $('.input-table').on('click', '.submitTable', function(){
			control.setX(control.getLength());
			control.setY(control.getLength());
			control.calculateMatrix(control.getLength());
			view.renderFinalMarix(control.getLength(), control.getMatrix(), control.getD(), control.getYDivD());
			view.renderResult();
		}),

		renderFinalMarix: function(length, matrix, d, yDivd){
			var htmlstr = "<table class='final'>";
			for (var i = 0; i<length; i++){
				htmlstr += "<tr> <td>"+i+"</td>";
				for (var j = 0; j<length; j++){
					htmlstr += "<td class='m"+i+","+j+"'>"+matrix[i][j].toFixed(4)+"</td>";
				}
				htmlstr+="<td class='d"+i+"'>"+d[i]+"</td><td class='yDivd"+i+"'>"+yDivd[i].toFixed(4)+"</td></tr> ";
			}
			htmlstr += "</table>";
			view.finalMatrix.html(htmlstr);
		},

		renderResult: function(){
			var htmlstr = "<h2>f("+control.getXstar()+") = "+control.result(control.getLength());
			$(".result").html(htmlstr);
		}

	} 

	control.init();
});
