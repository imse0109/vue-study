<template>
	<v-container>
		<v-layout>
			<v-flex xs12 text-xs-center mt-5>
				<h1>Welcome to Vue Project</h1>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex xs12 sm6 offset-sm3 mt-3 class="text-xs-center" v-if="isAuthenticated">
				<v-btn  to="/todo">Todo</v-btn>
      		</v-flex>
			<v-flex xs12 sm6 offset-sm3 mt-3 class="text-xs-center" v-else>
        		<v-btn to="/join"> Join</v-btn>
        		<v-btn to="/login">Login</v-btn>
      		</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	computed : {
		isAuthenticated () {
        	return this.$store.getters.isAuthenticated
		}
	}
}
</script>
