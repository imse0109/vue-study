<template>
  	<v-app>
		<v-navigation-drawer v-model="sidebar" app>
      		<v-list>
        		<v-list-tile 
					v-for="item in menuItems"
          			:key="item.title"
          			:to="item.path">
          			<v-list-tile-content >{{ item.title }}</v-list-tile-content>
				</v-list-tile>
      		</v-list>
    	</v-navigation-drawer>

    	<v-toolbar app color="deep-orange">
			<span class="hidden-sm-and-up">
        		<v-toolbar-side-icon class="white--text" @click="sidebar = !sidebar">
        		</v-toolbar-side-icon>
      		</span>
      		<v-toolbar-title class="white--text">
				Vue Project
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-xs-only">
				<v-btn 
					flat 
					v-for="item in menuItems"
          			:key="item.title"
          			:to="item.path"
					class="white--text">{{ item.title }}</v-btn>
			</v-toolbar-items>
    	</v-toolbar>

		<v-content>
    		<router-view/>
		</v-content>
  	</v-app>
</template>

<script>
export default {
	data () {
		return {
			sidebar : false
		}
	},
	computed : {
		menuItems () {
         	return [
            	{ title: 'Join', path: '/join' },
            	{ title: 'Login', path: '/login' }
          	]
        }
	}
}
</script>

<style>
*{font-family: "NotoSansKR", sans-serif;}
</style>

