<script lang="ts">
  import { history } from '../stores/history';
  import { theme } from '../stores/theme';
  import Ps1 from './Ps1.svelte';
</script>

{#each $history as { command, outputs }}
  <div style={`color: ${$theme.foreground}`}>
    <div class="flex flex-col md:flex-row">
      <Ps1 />

      <div class="flex">
        <p class="visible md:hidden">❯</p>

        <p class="px-2">{command}</p>
      </div>
    </div>

    {#each outputs as output}
      {#if ['about', 'education'].includes(command.split(' ')[0])}
        <div class="whitespace-pre-wrap" aria-label="formatted command output">
          {@html output}
        </div>
      {:else}
        <p class="whitespace-pre">{output}</p>
      {/if}
    {/each}
  </div>
{/each}
