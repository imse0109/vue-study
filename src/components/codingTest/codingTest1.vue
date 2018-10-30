<template>
  	<v-container>
		<div class="code_test">
			<div>
				<p>Test 1. Card Game</p>
				<p>Question : A, K, Q, J, T, 2~9, 비교 후 결과값 찾는 함수를 작성하시오. 최대 6자리로 입력하시오.</p>
				<p>Input : A - A3456K, B - A2345Q</p>
			</div>
			
			<v-text-field 
                        v-model="A" 
                        required 
                        label="A"
						maxlength="6"
                    ></v-text-field>
			<v-text-field 
                        v-model="B" 
                        required 
                        label="B"
						maxlength="6"
                    ></v-text-field>
			<textarea v-model="testCode">
				
			</textarea>
			
			<v-btn block color="blue-grey darken-4" class="white--text" small @click="result(item, index)"><v-icon>done</v-icon></v-btn>
			<p class="code_test_output">Output : <span v-text="resultValue"></span></p>			
		</div>
  	</v-container>
</template>

<script>
export default {
  	data () {
    	return {
			A: 'A3456K',
			B: 'A2345Q',
			resultValue: '5',
			testCode:'function execute(var1, var2){\n\n}'
    	}
  	},
  	methods: {
		  result(){
				console.log(this.A);
				console.log(this.B);
				console.log(this.testCode);
				console.log(this);

				//var 

				var sentence = '';
				sentence += this.testCode + ';';
				sentence += 'execute();';

				console.log(eval(sentence));

				this.resultValue = eval(sentence);

		  }
  	},
  	computed: {
    	
  	},
  	watch: {
    	
  	}
}
</script>

<style>
.code_test button{margin:0;}
.code_test textarea{width:100%;height:200px;background:#fff;border:1px solid #000;padding:10px;}
.code_test .code_test_output{margin:20px 0 0 0;}
</style>

