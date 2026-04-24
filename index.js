const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ── Personal details (edit these before deploying) ──────────────────────────
const USER_ID            = 'kshitija_18042005';      
const EMAIL_ID           = 'kp0262@srmist.edu.in';
const COLLEGE_ROLL_NUMBER = 'RA2311033010150';
// ────────────────────────────────────────────────────────────────────────────

function isValidEntry(raw) {
  const s = raw.trim();
  // X->Y  where X,Y are single uppercase letter
  return /^[A-Z]->[A-Z]$/.test(s);
}

function buildResponse(data) {
  const invalid_entries  = [];
  const duplicate_edges  = [];
  const seenEdges        = new Set();
  const validEdges       = [];   // [parent, child]

  for (const raw of data) {
    const s = raw.trim();

    if (!isValidEntry(s)) {
      invalid_entries.push(raw);   // keep original for display
      continue;
    }

    // Self-loop already caught by regex (A->A)
    if (seenEdges.has(s)) {
      // Only push the FIRST duplicate (not subsequent)
      if (!duplicate_edges.includes(s)) duplicate_edges.push(s);
    } else {
      seenEdges.add(s);
      const [p, c] = s.split('->');
      validEdges.push([p, c]);
    }
  }

  // Build adjacency: first-parent wins for multi-parent nodes
  const children  = {};   // parent -> [children]
  const parentOf  = {};   // child  -> parent  (first seen wins)
  const allNodes  = new Set();

  for (const [p, c] of validEdges) {
    allNodes.add(p);
    allNodes.add(c);

    if (parentOf[c] !== undefined) continue; // already has a parent
    parentOf[c] = p;
    if (!children[p]) children[p] = [];
    children[p].push(c);
  }

  // Group nodes into connected components (undirected)
  const visited   = new Set();

  function component(node) {
    const stack = [node];
    const group = new Set();
    while (stack.length) {
      const n = stack.pop();
      if (group.has(n)) continue;
      group.add(n);
      // neighbours (parent + children)
      if (parentOf[n]) stack.push(parentOf[n]);
      for (const c of (children[n] || [])) stack.push(c);
    }
    return group;
  }

  const components = [];
  for (const node of allNodes) {
    if (!visited.has(node)) {
      const grp = component(node);
      for (const n of grp) visited.add(n);
      components.push(grp);
    }
  }

  // Build tree / detect cycle per component
  function hasCycle(root, ch) {
    const vis = new Set();
    const stack = [root];
    while (stack.length) {
      const n = stack.pop();
      if (vis.has(n)) return true;
      vis.add(n);
      for (const c of (ch[n] || [])) stack.push(c);
    }
    return false;
  }

  function buildTree(node, ch) {
    const obj = {};
    for (const c of (ch[node] || [])) {
      obj[c] = buildTree(c, ch);
    }
    return obj;
  }

  function depth(node, ch) {
    if (!(ch[node]) || ch[node].length === 0) return 1;
    return 1 + Math.max(...ch[node].map(c => depth(c, ch)));
  }

  const hierarchies = [];

  for (const grp of components) {
    // Find root(s): nodes never appearing as child within this group
    const roots = [...grp].filter(n => !parentOf[n] || !grp.has(parentOf[n]));
    let root;
    if (roots.length === 0) {
      // Pure cycle – lex smallest
      root = [...grp].sort()[0];
    } else {
      root = roots.sort()[0]; // lex smallest root if multiple
    }

    if (hasCycle(root, children)) {
      hierarchies.push({ root, tree: {}, has_cycle: true });
    } else {
      const tree  = { [root]: buildTree(root, children) };
      const d     = depth(root, children);
      hierarchies.push({ root, tree, depth: d });
    }
  }

  // Sort hierarchies: non-cyclic by depth desc then lex, cyclic at end
  hierarchies.sort((a, b) => {
    if (a.has_cycle && !b.has_cycle) return 1;
    if (!a.has_cycle && b.has_cycle) return -1;
    if (!a.has_cycle && !b.has_cycle) {
      if (b.depth !== a.depth) return b.depth - a.depth;
      return a.root < b.root ? -1 : 1;
    }
    return a.root < b.root ? -1 : 1;
  });

  // Summary
  const nonCyclic = hierarchies.filter(h => !h.has_cycle);
  let largest_tree_root = '';
  if (nonCyclic.length) {
    let best = nonCyclic[0];
    for (const h of nonCyclic) {
      if (h.depth > best.depth || (h.depth === best.depth && h.root < best.root)) {
        best = h;
      }
    }
    largest_tree_root = best.root;
  }

  return {
    user_id: USER_ID,
    email_id: EMAIL_ID,
    college_roll_number: COLLEGE_ROLL_NUMBER,
    hierarchies,
    invalid_entries,
    duplicate_edges,
    summary: {
      total_trees:  nonCyclic.length,
      total_cycles: hierarchies.filter(h => h.has_cycle).length,
      largest_tree_root,
    },
  };
}

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: '"data" must be an array of strings' });
    }
    return res.json(buildResponse(data));
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.get('/', (_, res) => res.json({ status: 'ok', route: 'POST /bfhl' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
