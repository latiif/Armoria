<script>
  import {tooltip} from './../../scripts/tooltip';
  import {generate} from './../../scripts/generator'
  export let els, el, i;

  const remove = e => {
    els = els.filter((e, n) => n !== i);
    e.stopPropagation();
  }

  const clone = e => {
    els = [...els, JSON.parse(JSON.stringify(el))];
    e.stopPropagation();
  }

  const forward = e => {
    [els[i], els[i+1]] = [els[i+1], els[i]];
    e.stopPropagation();
  }

  const backward = e => {
    [els[i], els[i-1]] = [els[i-1], els[i]];
    e.stopPropagation();
  }

  const CHARGE = "charge";
  const ORDINARY = "ordinary";
  const ElementTypes = [
    CHARGE,
    ORDINARY
  ];

  // getElementType returns the type of the current element
  function getElementType(el) {
    return ElementTypes.find(elementType => el.hasOwnProperty(elementType));
  }

  const Randomizers = new Map();
    Randomizers[CHARGE] = function(charge) {
      let randomized = generate()
      while (!randomized.hasOwnProperty("charges") && randomized.charges == undefined && randomized.charges.length == 0){
        randomized = generate()
      }
      console.log(randomized);
      charge.charge = randomized.charges[0].charge;
      charge.size = randomized.charges[0].size;
      charge.t = randomized.charges[0].t;
      charge.p = randomized.charges[0].p;
    };

    Randomizers[ORDINARY] = function(ordinary) {
      ordinary.t= "or";
    }

  const randomize = (e) => {
    let elementType = getElementType(el);
    Randomizers[elementType](el)
    els = els;
    e.stopPropagation();
  };
</script>

<span>
  <svg on:click={clone} title="Clone" use:tooltip>
    <use href="#clone-icon"></use>
  </svg>
  {#if els.length > 1}
    {#if i}
      <svg on:click={backward} title="Send backward" use:tooltip>
        <use href="#up-icon"></use>
      </svg>
    {/if}
    {#if i+1 < els.length}
      <svg on:click={forward} title="Bring forward" use:tooltip>
        <use href="#down-icon"></use>
      </svg>
    {/if}
  {/if}
  <svg on:click={remove} title="Remove" use:tooltip>
    <use href="#remove-icon"></use>
  </svg>

   <svg on:click={randomize} title="Randomize" use:tooltip>
    <use href="#dice-icon" />
  </svg>
</span>

<style>
  svg {
    width: .8em;
    height: .8em;
    fill: #fff;
  }

  svg:active {
    transform: translateY(1px);
  }
</style>