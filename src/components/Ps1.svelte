<script lang="ts">
  import config from '../../config.json';
  import { theme } from '../stores/theme';
</script>

<h1 class="font-bold flex">
  <span style={`color: ${$theme.yellow};`}>{config.ps1_username}</span>
  <span style={`color: ${$theme.white}`}>:~$</span>
</h1>
