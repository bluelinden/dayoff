<script lang="ts">
	import bluelindenLogo from '$lib/assets/orange-3d-1x.svg';
</script>

<div class="flex h-screen flex-col justify-center">
	<h1 class="text-center font-serif text-2xl">Is school off today?</h1>
	<p class="text-center text-[256px] font-bold">No.</p>
	<p class="mb-1 text-center text-2xl font-bold">
		dayoff<b class="text-plastic-orange">.</b>school
	</p>
	<a
		href="https://blue.linden.rocks/"
		target="_blank"
		rel="noopener noreferrer"
		class="mx-auto flex flex-row items-center justify-center gap-2 rounded-lg bg-plastic-beige pr-4 text-2xl font-bold text-plastic-gray"
	>
		<img src={bluelindenLogo} alt="blue linden's logo" class="h-16 w-16 rounded-xl" />
		by blue linden
	</a>
</div>
