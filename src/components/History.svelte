<script lang="ts">
  import { history } from '../stores/history';
  import { theme } from '../stores/theme';
  import Ps1 from './Ps1.svelte';

  const htmlCommands = ['about', 'education'];
  const linkedTextCommands = [
    'achievements',
    'experience',
    'optilang',
    'projects',
    'rag',
    'skills',
  ];

  const linkify = (output: string): string =>
    output
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replace(
        /(https?:\/\/[^\s]+|mailto:[^\s]+|tel:[^\s]+)/g,
        (url) => `<a class="text-green-400 underline break-all" href="${url}" target="_blank" rel="noreferrer">${url}</a>`,
      );
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
      {#if htmlCommands.includes(command.split(' ')[0])}
        <div class="whitespace-pre-wrap break-words leading-relaxed" aria-label="formatted command output">
          {@html output}
        </div>
      {:else if linkedTextCommands.includes(command.split(' ')[0])}
        <div class="whitespace-pre-wrap break-words leading-relaxed" aria-label="formatted command output">
          {@html linkify(output)}
        </div>
      {:else}
        <p class="whitespace-pre-wrap break-words leading-relaxed">{output}</p>
      {/if}
    {/each}
  </div>
{/each}
