/* Illustrative packages for the demo. Replace with operator-approved rates before taking bookings. */
(() => {
  'use strict';
  const groupOffer = Object.freeze({ minimumPeople: 8, discountPercent: 5, maximumPeople: 30, isSample: true });
  window.TRIPPY_BOOKING_POLICY = groupOffer;
  window.TRIPPY_TRIPS = {
    shangarh: {
      id: 'shangarh', title: 'Shangarh', region: 'Himachal Pradesh', duration: '3 days · 2 nights', days: 3, nights: 2,
      headline: 'A little slower. A little greener.',
      description: 'A meadow escape with village walks, wide-open views and an easy evening with your people.',
      image: 'assets/img/shangarh-green-meadows.webp', imageAlt: 'Green Shangarh meadows beneath forested mountains',
      imageCaption: 'Shangarh meadow · destination inspiration',
      places: ['Shangarh meadows', 'Shangchul Mahadev temple', 'Shangarh village', 'Sainj Valley'],
      start: 'Aut bus stand', end: 'Aut bus stand',
      transferNote: 'Proposed shared vehicle transfers from Aut and sightseeing along this route. Travel to and from Aut is extra.',
      mealSummary: '2 breakfasts + 2 dinners',
      staySummary: '2 nights in a local homestay',
      activitySummary: 'Meadow walks · village time · a possible bonfire',
      bonfire: 'One proposed bonfire evening at the stay, only if weather, property rules and local permissions allow. No bonfire is guaranteed.',
      accessNote: 'Easy walks can be adapted to the group. Final stops, local access and stay arrangements need confirmation.',
      packages: {
        standard: { label: 'Standard', pricePaise: 599900, stay: 'Shared homestay · twin/triple sharing', description: 'A simple local stay and all proposed package inclusions.' },
        comfort: { label: 'Comfort', pricePaise: 849900, stay: 'Upgraded homestay · twin sharing', description: 'The same route with an upgraded room category.' }
      },
      itinerary: [
        { title: 'Arrive, settle in, breathe out', places: 'Aut → Shangarh meadows', description: 'Meet at Aut bus stand and take the proposed transfer to Shangarh. Check in, get together over introductions and head out for an unhurried meadow walk.', meals: 'Dinner', stay: 'Shangarh homestay' },
        { title: 'Meadows, village lanes & valley views', places: 'Shangarh village · temple surroundings · Sainj Valley', description: 'After breakfast, explore the village and the Shangchul Mahadev temple surroundings respectfully, then enjoy a relaxed valley outing. Return for dinner and a possible bonfire at the stay, subject to conditions and permission.', meals: 'Breakfast + dinner', stay: 'Shangarh homestay' },
        { title: 'One last slow morning', places: 'Shangarh → Aut', description: 'Make time for breakfast and a final stroll before checkout. Take the proposed return transfer to Aut for your onward journey.', meals: 'Breakfast', stay: 'Return journey · no overnight stay' }
      ],
      inclusions: ['2 nights in the selected stay category', '2 breakfasts and 2 dinners', 'Proposed shared Aut–Shangarh return transfers', 'Sightseeing transport on the described route', 'Group coordination during the trip'],
      exclusions: ['Travel to and from Aut', 'Lunches, snacks and drinks', 'Entry charges or activities not expressly included', 'Travel insurance and personal expenses', 'Applicable taxes, if any, to be confirmed in the final quote'],
      sources: ['https://greathimalayannationalpark.org/valleys/sainj-valley/']
    },
    jibhi: {
      id: 'jibhi', title: 'Jibhi & Shoja', region: 'Himachal Pradesh', duration: '4 days · 3 nights', days: 4, nights: 3,
      headline: 'Forest roads. Fresh perspectives.',
      description: 'Waterfall mornings, time in Shoja and a day for the trail, with enough room to stop and stare.',
      image: 'assets/img/jibhi-mountain-views.webp', imageAlt: 'Snow-covered mountains framed by pine branches, photographed from Jibhi',
      imageCaption: 'Views from Jibhi · destination inspiration',
      places: ['Jibhi waterfall', 'Jibhi village', 'Shoja', 'Jalori Pass', 'Serolsar Lake trail'],
      start: 'Aut bus stand', end: 'Aut bus stand',
      transferNote: 'Proposed shared transfers from Aut and transport between the listed stops. Travel to and from Aut is extra.',
      mealSummary: '3 breakfasts + 3 dinners',
      staySummary: '1 night Jibhi + 2 nights Shoja',
      activitySummary: 'Waterfall visit · village walks · optional day hike',
      bonfire: 'One proposed bonfire evening at the stay, only if weather, property rules and local permissions allow. No bonfire is guaranteed.',
      accessNote: 'Jalori Pass and the Serolsar Lake trail depend on season, weather and road access. In closure or unsafe conditions, propose a shorter local walk instead.',
      packages: {
        standard: { label: 'Standard', pricePaise: 699900, stay: 'Shared homestays · twin/triple sharing', description: 'Cosy local stays and all proposed package inclusions.' },
        comfort: { label: 'Comfort', pricePaise: 999900, stay: 'Upgraded rooms · twin sharing', description: 'The same route with an upgraded room category.' }
      },
      itinerary: [
        { title: 'Hello, mountain air', places: 'Aut → Jibhi', description: 'Meet at Aut and transfer to Jibhi. Settle into the homestay, explore the village at your own pace and come together for dinner.', meals: 'Dinner', stay: 'Jibhi homestay' },
        { title: 'A waterfall & a quieter road', places: 'Jibhi waterfall → Shoja', description: 'Visit Jibhi waterfall after breakfast, then take the proposed transfer towards Shoja. Check in and enjoy a gentle village or forest walk. A bonfire evening may be arranged if conditions and local rules permit.', meals: 'Breakfast + dinner', stay: 'Shoja homestay' },
        { title: 'Make a day of the trail', places: 'Jalori Pass · Serolsar Lake trail', description: 'If the road and trail are open, head to Jalori Pass and follow the Serolsar Lake trail with the group. The walk requires suitable fitness and footwear. Use a shorter local alternative if weather or access makes the trail unsuitable.', meals: 'Breakfast + dinner', stay: 'Shoja homestay' },
        { title: 'Take the long way home', places: 'Shoja → Aut', description: 'Enjoy breakfast, check out and take the proposed transfer back to Aut. Keep your onward travel flexible until the operator confirms road conditions and timings.', meals: 'Breakfast', stay: 'Return journey · no overnight stay' }
      ],
      inclusions: ['3 nights in the selected stay category', '3 breakfasts and 3 dinners', 'Proposed shared transfers from and back to Aut', 'Transport for the described sightseeing route', 'Group coordination for the proposed walks'],
      exclusions: ['Travel to and from Aut', 'Lunches, snacks and drinks', 'Any entry, permit or specialist guide charges', 'Personal expenses, gear and travel insurance', 'Applicable taxes, if any, to be confirmed in the final quote'],
      sources: ['https://himachaltourism.gov.in/destination/kullu-2/']
    },
    kashmir: {
      id: 'kashmir', title: 'Kashmir', region: 'Srinagar · Gulmarg · Pahalgam', duration: '6 days · 5 nights', days: 6, nights: 5,
      headline: 'Big views. A whole new rhythm.',
      description: 'A proposed journey through lakeside Srinagar, mountain views in Gulmarg and slower days beside the river in Pahalgam.',
      image: 'assets/img/kashmir-gadsar-lake.webp', imageAlt: 'Turquoise Gadsar Lake beneath rocky peaks in Kashmir',
      imageCaption: 'Kashmir inspiration · Gadsar Lake is not on this route',
      places: ['Dal Lake', 'Srinagar gardens', 'Gulmarg', 'Pahalgam', 'Lidder riverside'],
      start: 'Srinagar airport', end: 'Srinagar airport',
      transferNote: 'Proposed shared airport and route transfers. Flights, Gondola tickets and local union-taxi excursions are extra.',
      mealSummary: '5 breakfasts + 5 dinners',
      staySummary: '3 nights Srinagar + 2 nights Pahalgam',
      activitySummary: 'Lake time · gardens · mountain & valley outings',
      bonfire: 'An optional bonfire can be requested at the Pahalgam stay. Availability, permission and any extra charge must be confirmed; it is not included in this sample price.',
      accessNote: 'Route access and activities depend on season and local conditions. Gondola rides and extra valley excursions are optional and subject to separate tickets and availability.',
      packages: {
        standard: { label: 'Standard', pricePaise: 1899900, stay: 'Local hotels · twin/triple sharing', description: 'Comfortable local stays and all proposed package inclusions.' },
        comfort: { label: 'Comfort', pricePaise: 2699900, stay: 'Upgraded hotels · twin sharing', description: 'The same route with upgraded room categories.' }
      },
      itinerary: [
        { title: 'Srinagar, at your own pace', places: 'Srinagar airport → Dal Lake', description: 'Arrive at Srinagar airport and take the proposed transfer to your stay. Settle in and enjoy the Dal Lake surroundings. A short shared shikara ride is proposed, subject to local conditions.', meals: 'Dinner', stay: 'Srinagar hotel' },
        { title: 'Gardens, lanes & lakeside time', places: 'Srinagar · Mughal garden stops', description: 'Explore a selection of Srinagar garden stops and leave time for the lakeside or local lanes. The final garden choices and entry charges will be confirmed with the operator.', meals: 'Breakfast + dinner', stay: 'Srinagar hotel' },
        { title: 'A day in Gulmarg', places: 'Srinagar → Gulmarg → Srinagar', description: 'Head out for a proposed day excursion to Gulmarg and return to Srinagar. A Gondola ride is optional, separately charged and subject to tickets, weather and operations.', meals: 'Breakfast + dinner', stay: 'Srinagar hotel' },
        { title: 'Follow the valley', places: 'Srinagar → Pahalgam', description: 'Transfer to Pahalgam, check in and enjoy a relaxed riverside outing. Keep the rest of the afternoon open for settling into the valley.', meals: 'Breakfast + dinner', stay: 'Pahalgam hotel' },
        { title: 'Leave room for a little wonder', places: 'Pahalgam · Lidder riverside', description: 'Enjoy a slower day around Pahalgam. Aru or Betaab Valley can be requested as an optional excursion, with local transport and entry costs extra. Ask the stay about a possible bonfire and its charges.', meals: 'Breakfast + dinner', stay: 'Pahalgam hotel' },
        { title: 'One more view for the road', places: 'Pahalgam → Srinagar airport', description: 'Have breakfast, check out and take the proposed return transfer to Srinagar airport. Confirm a suitable flight time with the operator before booking your airfare.', meals: 'Breakfast', stay: 'Departure day · no overnight stay' }
      ],
      inclusions: ['5 nights in the selected hotel category', '5 breakfasts and 5 dinners', 'Proposed shared Srinagar airport transfers', 'Shared transport for the described main route', 'One proposed short shared shikara ride, subject to conditions'],
      exclusions: ['Flights or travel to and from Srinagar', 'Lunches, snacks and drinks', 'Gondola, garden entry and activity tickets', 'Local union taxis, optional valley tours and bonfire charges', 'Insurance, personal expenses and applicable taxes, if any'],
      sources: ['https://divcomkashmir.jk.gov.in/tourist-place/dal-lake/', 'https://www.jktdc.co.in/info.aspx?id=7', 'https://jktdc.co.in/info.aspx?id=10']
    }
  };
})();

(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'off';
  // One catalog powers prices, complete packages and quick route previews.
  const tripData = Object.fromEntries(Object.entries(window.TRIPPY_TRIPS).map(([key, trip]) => [key, {
    title: trip.title, region: trip.region, image: trip.image, imageAlt: trip.imageAlt,
    tagline: trip.headline, itinerary: trip.itinerary.map(day => [day.title, day.description])
  }]));
  const formatRupees = amount => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount / 100);
  $$('[data-price-range]').forEach(node => {
    const prices = Object.values(window.TRIPPY_TRIPS[node.dataset.priceRange].packages).map(item => item.pricePaise);
    node.textContent = `${formatRupees(Math.min(...prices))}–${formatRupees(Math.max(...prices))}`;
  });
  $$('[data-trip-duration]').forEach(node => { node.textContent = window.TRIPPY_TRIPS[node.dataset.tripDuration].duration; });


  const cards = $$('[data-trip-card]');
  const filterButtons = $$('[data-filter]');
  const tripDialog = $('#trip-dialog');
  const planDialog = $('#plan-dialog');
  const photoDialog = $('#photo-dialog');
  const dialogs = [tripDialog, planDialog, photoDialog];
  const openers = new WeakMap();
  let currentTrip = 'shangarh';
  let currentCategory = 'all';
  let currentDestination = null;
  const legacySavedKey = 'trippy-trail:saved:v1';
  const savedKeyPrefix = 'trippy-trail:saved:v2:';
  const unsavedTripChanges = new Map();
  let savedTrips = new Set();

  function refreshSavedTrips() {
    try {
      const storage = window.localStorage;
      const legacyValue = storage.getItem(legacySavedKey);
      let legacy = [];
      try { legacy = JSON.parse(legacyValue || '[]'); } catch { /* Ignore a malformed legacy list. */ }
      const next = new Set(Array.isArray(legacy) ? legacy.filter(key => Object.hasOwn(tripData, key)) : []);
      Object.keys(tripData).forEach(key => {
        const value = storage.getItem(savedKeyPrefix + key);
        // Migrate lazily on an explicit change. A stored 0 overrides old v1 saves.
        // Reading never writes a snapshot that could overwrite another tab's work.
        if (value !== null) {
          if (value === '1') next.add(key); else next.delete(key);
        }
      });
      savedTrips = next;
    } catch { /* A private or local-file browser can still use an in-memory shortlist. */ }
    unsavedTripChanges.forEach((saved, key) => {
      if (saved) savedTrips.add(key); else savedTrips.delete(key);
    });
  }
  refreshSavedTrips();

  let toastTimer;

  function toast(message) {
    const box = $('#toast');
    clearTimeout(toastTimer);
    (dialogs.find(dialog => dialog.open) || document.body).append(box);
    box.textContent = message;
    box.hidden = false;
    toastTimer = setTimeout(() => { box.hidden = true; }, 5000);
  }

  function closeMenu(restoreFocus = false) {
    const toggle = $('.menu-toggle');
    $('#mobile-nav').hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    if (restoreFocus) toggle.focus();
  }

  $('.menu-toggle').addEventListener('click', () => {
    const toggle = $('.menu-toggle');
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    $('#mobile-nav').hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  $$('#mobile-nav a').forEach(link => link.addEventListener('click', () => closeMenu()));
  $$('#mobile-nav [data-book]').forEach(button => button.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !$('#mobile-nav').hidden) closeMenu(true);
  });
  window.matchMedia('(min-width: 981px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  $$('a[href="#top"]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    closeMenu();
    $('.site-header a[href="#top"]')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
    history.replaceState(null, '', '#top');
  }));

  $$('a[href="#photo-credits"]').forEach(link => link.addEventListener('click', () => {
    $('#photo-credits').open = true;
  }));

  function updateSavedUI() {
    $('#saved-count').textContent = String(savedTrips.size);
    $$('[data-save]').forEach(button => {
      const key = button.dataset.save;
      const saved = savedTrips.has(key);
      button.setAttribute('aria-pressed', String(saved));
      button.setAttribute('aria-label', `${saved ? 'Remove' : 'Save'} ${tripData[key].title} ${saved ? 'from' : 'to'} your shortlist`);
    });
  }

  function applyFilter(category = 'all', destination = null) {
    currentCategory = category;
    currentDestination = destination;
    let count = 0;
    cards.forEach(card => {
      const categoryMatch = category === 'all' || (category === 'saved' ? savedTrips.has(card.dataset.tripCard) : card.dataset.category === category);
      const show = categoryMatch && (!destination || card.dataset.tripCard === destination);
      card.hidden = !show;
      if (show) count += 1;
    });
    filterButtons.forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const place = destination ? ` for ${tripData[destination].title}` : '';
    $('#results-count').textContent = `${count} ${count === 1 ? 'escape' : 'escapes'}${place}${category === 'saved' ? ' in your shortlist' : ' to explore'}`;
    $('#empty-trails').hidden = count > 0;
    $('#empty-title').textContent = category === 'saved' ? 'A little space for your next adventure.' : 'A different combination, perhaps?';
    $('#empty-description').textContent = category === 'saved' ? 'Tap the heart on an escape to add it to your shortlist.' : 'No escape matches both choices. Try another mood or explore all three destinations.';
    document.dispatchEvent(new CustomEvent('trippy:filter'));
  }

  updateSavedUI();
  window.addEventListener('storage', event => {
    if (event.key !== null && event.key !== legacySavedKey && !event.key.startsWith(savedKeyPrefix)) return;
    try { if (event.storageArea && event.storageArea !== window.localStorage) return; } catch { return; }
    refreshSavedTrips();
    updateSavedUI();
    if (currentCategory === 'saved') {
      const focusedCard = document.activeElement?.closest('[data-trip-card]');
      applyFilter(currentCategory, currentDestination);
      if (focusedCard?.hidden) ($('[data-trip-card]:not([hidden]) [data-save]') || $('#show-all-trails')).focus({ preventScroll: true });
    }
  });
  $$('[data-save]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.save;
    const save = !savedTrips.has(key);
    refreshSavedTrips();
    let persisted = false;
    try {
      // One atomic key per destination: unrelated additions cannot overwrite each other.
      window.localStorage.setItem(savedKeyPrefix + key, save ? '1' : '0');
      unsavedTripChanges.delete(key);
      persisted = true;
    } catch { unsavedTripChanges.set(key, save); }
    if (save) savedTrips.add(key); else savedTrips.delete(key);
    updateSavedUI();
    if (currentCategory === 'saved') {
      applyFilter(currentCategory, currentDestination);
      if (!savedTrips.has(key)) ($('[data-trip-card]:not([hidden]) [data-save]') || $('#show-all-trails')).focus({ preventScroll: true });
    }
    toast(`${tripData[key].title} ${save ? 'added to' : 'removed from'} your shortlist.${persisted ? '' : ' For this tab only; browser storage is unavailable.'}`);
  }));
  filterButtons.forEach(button => button.addEventListener('click', () => {
    applyFilter(button.dataset.filter);
    $('#hero-destination').value = 'all';
    $('#hero-mood').value = ['slow', 'forest', 'views'].includes(button.dataset.filter) ? button.dataset.filter : 'all';
  }));
  $('#show-all-trails').addEventListener('click', () => {
    applyFilter('all');
    $('#hero-destination').value = 'all';
    $('#hero-mood').value = 'all';
    $('[data-filter="all"]').focus({ preventScroll: true });
  });
  $('#trail-finder').addEventListener('submit', event => {
    event.preventDefault();
    const destination = $('#hero-destination').value;
    applyFilter($('#hero-mood').value, tripData[destination] ? destination : null);
    $('#trails').scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  });

  function openDialog(dialog, trigger) {
    closeMenu();
    $$('dialog[open]').forEach(other => { if (other !== dialog) other.close(); });
    openers.set(dialog, trigger || document.activeElement);
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    $('[data-close]', dialog)?.focus({ preventScroll: true });
  }
  dialogs.forEach(dialog => {
    $$('[data-close]', dialog).forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if ($('#toast').parentElement === dialog) {
        $('#toast').hidden = true;
        document.body.append($('#toast'));
      }
      if (document.querySelector('dialog[open]')) return;
      document.body.style.overflow = '';
      const opener = openers.get(dialog);
      const parentDialog = opener?.closest?.('dialog');
      if (opener?.isConnected && opener.getClientRects().length && (!parentDialog || parentDialog.open)) opener.focus({ preventScroll: true });
      else ($('.menu-toggle').getClientRects().length ? $('.menu-toggle') : $('[data-plan]')).focus({ preventScroll: true });
    });
  });

  const photoSlots = $$('[data-photo-slot]');
  const initialPhotos = new Map(photoSlots.map(slot => [slot.dataset.photoSlot, {
    src: $('img', slot).getAttribute('src'), alt: $('img', slot).alt,
    status: $('.photo-status', slot).innerHTML
  }]));
  const previewPhotos = new Map();
  function updateDialogPhoto(key) {
    const photo = previewPhotos.get(key);
    const image = $('#trip-dialog-image');
    image.src = photo?.url || tripData[key].image;
    image.alt = photo ? `Your selected ${tripData[key].title} photo preview` : tripData[key].imageAlt;
    $('.photo-status', tripDialog).innerHTML = `<span></span>${photo ? 'Your photo preview' : 'Destination photo'}`;
  }

  $$('[data-trip]').forEach(button => button.addEventListener('click', () => {
    currentTrip = button.dataset.trip;
    const trip = tripData[currentTrip];
    $('#trip-dialog-title').textContent = trip.title;
    $('#trip-dialog-region').textContent = trip.region;
    $('#trip-dialog-tagline').textContent = trip.tagline;
    $('#itinerary').replaceChildren(...trip.itinerary.map(([title, text], index) => {
      const item = document.createElement('li');
      const number = document.createElement('span');
      number.className = 'day-number';
      number.textContent = String(index + 1).padStart(2, '0');
      const content = document.createElement('div');
      const heading = document.createElement('h4');
      heading.textContent = title;
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      content.append(heading, paragraph);
      item.append(number, content);
      return item;
    }));
    updateDialogPhoto(currentTrip);
    openDialog(tripDialog, button);
  }));

  function openPlan(key, trigger) {
    if (tripData[key]) $('#plan-destination').value = tripData[key].title;
    if (key === 'custom') $('#plan-destination').value = 'A different destination';
    $('#enquiry-form').hidden = false;
    $('#enquiry-result').hidden = true;
    openDialog(planDialog, trigger);
  }
  $$('[data-plan]').forEach(button => button.addEventListener('click', () => openPlan(button.dataset.plan, button)));
  $('#trip-plan-button').addEventListener('click', event => {
    if (window.TrippyBooking) window.TrippyBooking.open(currentTrip, event.currentTarget);
    else openPlan(currentTrip, $('[data-plan]'));
  });

  const now = new Date();
  $('#plan-people').step = '1';
  const indiaParts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'numeric' }).formatToParts(now);
  const currentYear = Number(indiaParts.find(part => part.type === 'year').value);
  const currentMonth = Number(indiaParts.find(part => part.type === 'month').value) - 1;
  for (let index = 0; index < 12; index += 1) {
    const date = new Date(Date.UTC(currentYear, currentMonth + index, 1));
    const label = date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    $('#plan-month').add(new Option(label, label));
  }
  $('#enquiry-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const people = Number($('#plan-people').value);
    if (!Number.isInteger(people) || people < 1 || people > 50) {
      $('#plan-people').setCustomValidity('Enter a whole number from 1 to 50.');
      $('#plan-people').reportValidity();
      return;
    }
    const notes = $('#plan-notes').value.trim();
    const dates = $('#plan-dates').value.trim();
    const lines = [
      'Hi Trippy Trail! I would love to plan a trip.', '',
      `Destination: ${$('#plan-destination').value}`,
      `When: ${$('#plan-month').value}`,
      ...(dates ? [`Preferred dates: ${dates}`] : []),
      `Travellers: ${people}`,
      `Budget per person: ${$('#plan-budget').value}`,
      `Travel style: ${$('#plan-style').value}`,
      ...(notes ? ['', `A little more about my plans: ${notes}`] : []), '',
      'Please share your current departure dates, actual itinerary, starting point, inclusions and price. Thank you!'
    ];
    $('#enquiry-message').value = lines.join('\n');
    form.hidden = true;
    $('#enquiry-result').hidden = false;
    $('#enquiry-message').focus({ preventScroll: false });
  });
  $('#plan-people').addEventListener('input', () => $('#plan-people').setCustomValidity(''));
  $('#edit-enquiry').addEventListener('click', () => {
    $('#enquiry-result').hidden = true;
    $('#enquiry-form').hidden = false;
    $('#plan-destination').focus();
  });
  $('#copy-enquiry').addEventListener('click', async () => {
    const message = $('#enquiry-message');
    if (!message.value.trim()) { toast('Add a message before copying.'); return; }
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard is unavailable');
      await navigator.clipboard.writeText(message.value);
      toast('Message copied. Open Instagram and send it when you are ready.');
    } catch {
      message.focus();
      message.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch { /* Selection remains available for manual copying. */ }
      toast(copied ? 'Message copied. Nothing has been sent.' : 'Message selected. Use Ctrl+C or Command+C to copy, then open Instagram.');
    }
  });

  $('#open-photo-tools').addEventListener('click', event => openDialog(photoDialog, event.currentTarget));
  const maxPhotoBytes = 15 * 1024 * 1024;
  let photoGeneration = 0;
  function resetPhotos(showFeedback = true) {
    photoGeneration += 1;
    photoSlots.forEach(slot => {
      const original = initialPhotos.get(slot.dataset.photoSlot);
      $('img', slot).src = original.src;
      $('img', slot).alt = original.alt;
      $('.photo-status', slot).innerHTML = original.status;
    });
    previewPhotos.forEach(photo => URL.revokeObjectURL(photo.url));
    previewPhotos.clear();
    $('#photo-input').value = '';
    updateDialogPhoto(currentTrip);
    if (showFeedback) $('#photo-feedback').textContent = 'Preview reset. The destination photographs are back.';
    document.dispatchEvent(new CustomEvent('trippy:photos-reset'));
  }
  $('#reset-photos').addEventListener('click', () => resetPhotos());
  $('#photo-input').addEventListener('change', async event => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    resetPhotos(false);
    const generation = photoGeneration;
    const messages = [];
    if (files.length > photoSlots.length) messages.push('Only the first seven files were considered.');
    let added = 0;
    for (const [index, file] of files.slice(0, photoSlots.length).entries()) {
      if (!file.type.startsWith('image/')) { messages.push(`File ${index + 1} is not a supported image.`); continue; }
      if (file.size > maxPhotoBytes) { messages.push(`File ${index + 1} exceeds the 15 MB limit.`); continue; }
      const url = URL.createObjectURL(file);
      const probe = new Image();
      probe.src = url;
      try { await probe.decode(); } catch { URL.revokeObjectURL(url); messages.push(`File ${index + 1} could not be read; try JPEG, PNG or WebP.`); continue; }
      if (generation !== photoGeneration) { URL.revokeObjectURL(url); return; }
      const slot = photoSlots[index];
      previewPhotos.set(slot.dataset.photoSlot, { url });
      $('img', slot).src = url;
      $('img', slot).alt = `Your selected photo preview for ${slot.dataset.photoSlot.replace(/journal(\d)/, 'travel journal $1')}`;
      $('.photo-status', slot).innerHTML = '<span></span>Your photo preview';
      added += 1;
    }
    if (generation !== photoGeneration) return;
    updateDialogPhoto(currentTrip);
    $('#photo-feedback').textContent = `${added} ${added === 1 ? 'photo' : 'photos'} added to this temporary preview. Nothing was uploaded. ${messages.join(' ')}`.trim();
  });

  // No booking, messaging, analytics or image-upload requests are made by this page.
  // The original profile is opened only by the visitor's explicit link action.
})();

/* Browser-only PDF export. Vendored libraries and embedded fonts also work in the portable HTML. */
(() => {
  'use strict';
  const FONT_URLS = ['assets/fonts/dm-sans-400.ttf', 'assets/fonts/dm-sans-600.ttf', 'assets/fonts/manrope-800.ttf'];
  let fontBytesPromise;
  let libsPromise;
  // The PDF tools are about 1 MB, so they download only when a visitor asks for a PDF.
  function loadLibs() {
    if (window.PDFLib && window.fontkit) return Promise.resolve();
    if (!libsPromise) {
      libsPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'assets/js/pdf-libs.js';
        script.onload = resolve;
        script.onerror = () => { libsPromise = null; script.remove(); reject(new Error('The PDF tools could not be loaded.')); };
        document.head.append(script);
      });
    }
    return libsPromise;
  }

  function loadFonts() {
    if (!fontBytesPromise) {
      fontBytesPromise = Promise.all(FONT_URLS.map(async url => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('The estimate fonts could not be loaded.');
        return response.arrayBuffer();
      })).catch(error => { fontBytesPromise = null; throw error; });
    }
    return fontBytesPromise;
  }

  // Retain the traveller's text; normalize only whitespace and typographic dashes.
  const clean = value => String(value ?? '').replace(/[\u2010-\u2015\u2212]/g, '-').replace(/\s+/g, ' ').trim();
  function wrap(value, width, measure) {
    const lines = [];
    let line = '';
    for (const word of clean(value).split(' ')) {
      const candidate = line ? `${line} ${word}` : word;
      if (measure(candidate) <= width) { line = candidate; continue; }
      if (line) { lines.push(line); line = ''; }
      if (measure(word) <= width) { line = word; continue; }
      // Long names or unbroken text must not escape a column.
      const parts = typeof Intl.Segmenter === 'function'
        ? Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(word), part => part.segment)
        : Array.from(word);
      for (const part of parts) {
        if (line && measure(line + part) > width) { lines.push(line); line = ''; }
        line += part;
      }
    }
    if (line || !lines.length) lines.push(line);
    return lines;
  }

  async function create({ draft, trip, reference, methodLabel, formatMoney, formatDate, itineraryOnly = false }) {
    await loadLibs();
    if (!window.PDFLib || !window.fontkit) throw new Error('The PDF exporter has not loaded. Please reopen the page.');
    const { PDFDocument, rgb } = window.PDFLib;
    const documentPdf = await PDFDocument.create();
    documentPdf.registerFontkit(window.fontkit);
    const bytes = await loadFonts();
    const [regular, semibold, heading] = await Promise.all(bytes.map(value => documentPdf.embedFont(value, { subset: true })));
    const created = new Date();
    documentPdf.setTitle(itineraryOnly ? `Trippy Trail - ${trip.title} - Sample itinerary` : `Trippy Trail - ${trip.title} - Sample estimate ${reference}`);
    documentPdf.setAuthor('Trippy Trail');
    documentPdf.setSubject(itineraryOnly ? 'Illustrative proposed itinerary. Dates, prices and availability are not confirmed.' : 'Illustrative trip estimate. No payment taken and no reservation made.');
    documentPdf.setCreator('Trippy Trail estimate builder');
    documentPdf.setCreationDate(created);
    documentPdf.setModificationDate(created);
    documentPdf.setLanguage('en-IN');

    const W = 595.28, H = 841.89, M = 44, CW = W - M * 2, BOTTOM = 765;
    const color = hex => rgb(...hex.match(/\w\w/g).map(part => parseInt(part, 16) / 255));
    const C = { ink: color('143d32'), muted: color('5b6e62'), orange: color('ed632a'), lime: color('e4f18b'), pale: color('f1f4e8'), line: color('d9dfcf'), white: rgb(1, 1, 1) };
    let page, y;
    const lineHeight = 15;

    function text(value, x, top, { size = 10.5, font = regular, fill = C.ink } = {}) {
      page.drawText(clean(value), { x, y: H - top - size, size, font, color: fill });
    }
    function rect(x, top, width, height, fill) {
      page.drawRectangle({ x, y: H - top - height, width, height, color: fill });
    }
    function rule(top, x = M, width = CW) {
      page.drawLine({ start: { x, y: H - top }, end: { x: x + width, y: H - top }, color: C.line, thickness: 0.7 });
    }
    function linesFor(value, width = CW, size = 10.5, font = regular) {
      return wrap(value, width, line => font.widthOfTextAtSize(line, size));
    }
    function linesAt(lines, x, top, options = {}) {
      const leading = options.leading || lineHeight;
      lines.forEach((line, index) => text(line, x, top + index * leading, options));
      return top + lines.length * leading;
    }
    function paragraph(value, x, top, width, options = {}) {
      return linesAt(linesFor(value, width, options.size || 10.5, options.font || regular), x, top, options);
    }
    function right(value, top, size = 11, font = semibold, edge = W - M) {
      text(value, edge - font.widthOfTextAtSize(clean(value), size), top, { size, font });
    }
    function newPage(title, subtitle) {
      page = documentPdf.addPage([W, H]);
      page.drawCircle({ x: 59, y: H - 52, size: 15, color: C.orange });
      page.drawSvgPath('M13 14c2 0 2 22 11 22s10-22 11-22M8 15c3-4 8-4 11-3m10 0c4-1 8 0 11 3', { x: 44, y: H - 37, scale: 0.62, borderColor: C.white, borderWidth: 3 });
      text('trippy.trail_', 83, 36, { size: 21, font: heading });
      text('Good vibes. Great trails.', 83, 63, { size: 8.5, fill: C.muted });
      rect(W - M - 140, 41, 140, 25, C.pale);
      text(itineraryOnly ? 'SAMPLE ITINERARY' : 'SAMPLE TRIP ESTIMATE', W - M - 128, 48, { size: 8.1, font: semibold });
      rule(92);
      text(title, M, 112, { size: 29, font: heading });
      y = paragraph(subtitle, M, 154, CW, { size: 10, fill: C.muted }) + 20;
    }
    function section(label) {
      text(label, M, y, { size: 9, font: semibold, fill: C.muted });
      y += 25;
    }
    function pair(label, value, x, top, width, detail = '') {
      text(label, x, top, { size: 8.5, fill: C.muted });
      let end = paragraph(value, x, top + 15, width, { font: semibold, size: 11 });
      if (detail) end = paragraph(detail, x, end + 3, width, { size: 9, fill: C.muted, leading: 13 });
      return end;
    }

    // The on-screen quote is the authority for this demo: do not recalculate or drop paise here.
    const price = draft.quote;
    const stay = trip.packages[draft.packageKey];
    if (itineraryOnly) {
      newPage(trip.title, `${trip.region}  |  ${trip.duration}`);
      y = Math.max(y, 193);
      text(`Reference: ${reference}`, M, y, { size: 8.5, fill: C.muted });
      right(`Prepared ${new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(created)}`, y, 8.5, regular);
      y += 34;
      const half = (CW - 30) / 2, half2 = M + half + 30;
      y = paragraph(trip.description, M, y, CW, { size: 10.5 }) + 20;
      y = Math.max(
        pair('START / FINISH', trip.start, M, y, half, `Return to ${trip.end}`),
        pair('MEALS', trip.mealSummary, half2, y, half)
      ) + 20;
      y = Math.max(
        pair('STANDARD STAY', trip.packages.standard.stay, M, y, half),
        pair('COMFORT STAY', trip.packages.comfort.stay, half2, y, half)
      ) + 22;
      section('PLACES ON THE ROUTE');
      y = paragraph(trip.places.join('  |  '), M, y, CW, { size: 10 }) + 22;
      rect(M, y, CW, 52, C.pale);
      paragraph('Proposed plan only. Dates, prices, availability and arrangements are not confirmed. Please confirm everything with Trippy Trail before planning around this itinerary.', M + 16, y + 11, CW - 32, { size: 9, fill: C.muted, leading: 13 });
    } else {
    newPage(trip.title, `${trip.region}  |  ${trip.duration}`);
    y = Math.max(y, 193);
    text(`Reference: ${reference}`, M, y, { size: 8.5, fill: C.muted });
    right(`Prepared ${new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(created)}`, y, 8.5, regular);
    y += 34;
    const col = (CW - 30) / 2, col2 = M + col + 30;
    y = Math.max(
      pair('DEPARTURE DATE', formatDate(draft.preferredArrival), M, y, col, 'Sample departure - the team confirms seats'),
      pair('YOUR GROUP', `${draft.people} traveller${draft.people === 1 ? '' : 's'}`, col2, y, col, trip.mealSummary)
    ) + 20;
    y = Math.max(
      pair('STAY STYLE', stay.label, M, y, col, stay.stay),
      pair('START / FINISH', trip.start, col2, y, col, `Return to ${trip.end}`)
    ) + 18;

    const methodTop = y;
    const methodEnd = pair('SIMULATED PAYMENT METHOD', methodLabel, col2, methodTop, col);
    let nameEnd = methodTop;
    if (draft.leadName) {
      text('LEAD TRAVELLER', M, methodTop, { size: 8.5, fill: C.muted });
      const name = clean(draft.leadName);
      const supported = new Set(semibold.getCharacterSet());
      if (Array.from(name).every(character => supported.has(character.codePointAt(0)))) {
        nameEnd = paragraph(name, M, methodTop + 15, col, { size: 11, font: semibold });
      } else {
        // Preserve scripts outside the Latin font (for example Hindi) using the browser's text shaping.
        // Only this optional field is an image; all estimate details and amounts stay selectable text.
        await document.fonts.ready;
        const scale = 3, size = 11, leading = 17, pad = 8;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Unable to render the traveller name.');
        context.font = `600 ${size}px "DM Sans", sans-serif`;
        const nameLines = wrap(name, col - pad * 2, line => context.measureText(line).width);
        const height = nameLines.length * leading + pad * 2;
        canvas.width = Math.ceil(col * scale); canvas.height = Math.ceil(height * scale);
        context.scale(scale, scale);
        context.font = `600 ${size}px "DM Sans", sans-serif`;
        context.textBaseline = 'alphabetic'; context.fillStyle = '#143d32';
        nameLines.forEach((line, index) => context.fillText(line, pad, pad + size + index * leading));
        const nameImage = await documentPdf.embedPng(canvas.toDataURL('image/png'));
        page.drawImage(nameImage, { x: M - pad, y: H - (methodTop + 15 - pad) - height, width: col, height });
        nameEnd = methodTop + 15 + nameLines.length * leading;
      }
    }
    y = Math.max(nameEnd, methodEnd) + 24;
    const boxTop = y, edge = W - M - 20;
    const offerRow = 0;
    rect(M, boxTop, CW, 190 + offerRow, C.pale);
    text('YOUR SAMPLE PRICE', M + 20, boxTop + 17, { size: 9, font: semibold, fill: C.muted });
    text(`${formatMoney(price.unitPaise)} × ${draft.people} traveller${draft.people === 1 ? '' : 's'}`, M + 20, boxTop + 43);
    right(formatMoney(price.subtotalPaise), boxTop + 43, 11, semibold, edge);
    text(`Group saving (${price.discountPercent}%)`, M + 20, boxTop + 69);
    right(`${price.discountPaise ? '-' : ''}${formatMoney(price.discountPaise)}`, boxTop + 69, 11, semibold, edge);
    if (offerRow) {
      text(`First trip offer (${price.offerPercent}%, code ${price.offerCode})`, M + 20, boxTop + 95);
      right(`-${formatMoney(price.offerPaise)}`, boxTop + 95, 11, semibold, edge);
    }
    rule(boxTop + 98 + offerRow, M + 20, CW - 40);
    text('Sample total', M + 20, boxTop + 115 + offerRow, { size: 12, font: semibold });
    right(formatMoney(price.totalPaise), boxTop + 108 + offerRow, 26, heading, edge);
    text('Before applicable taxes. Extras excluded.', M + 20, boxTop + 151 + offerRow, { size: 8.7, fill: C.muted });
    right(`${formatMoney(price.perPersonPaise)} per person`, boxTop + 151 + offerRow, 9, regular, edge);
    y = boxTop + 210 + offerRow;
    text('No payment taken. No reservation made.', M, y, { font: semibold, size: 11 });
    y = paragraph('This is a sample estimate, not an invoice or booking confirmation. Final rates, taxes, availability and arrangements must be confirmed with Trippy Trail.', M, y + 21, CW, { size: 9.5, fill: C.muted, leading: 14 }) + 15;
    paragraph(`Sample group offer: ${window.TRIPPY_BOOKING_POLICY?.discountPercent || 5}% off for ${window.TRIPPY_BOOKING_POLICY?.minimumPeople || 8}+ travellers. Your proposed itinerary and package details follow.`, M, y, CW, { size: 9, fill: C.muted, leading: 13 });

    }

    newPage('Your proposed journey.', `${trip.title}  |  ${trip.duration}  |  Stops and arrangements need confirmation.`);
    for (const [index, day] of trip.itinerary.entries()) {
      const bodyX = M + 55, bodyWidth = CW - 55;
      const title = linesFor(day.title, bodyWidth, 12, semibold);
      const places = linesFor(day.places, bodyWidth, 9.5);
      const description = linesFor(day.description, bodyWidth, 10);
      const meals = linesFor(`Meals: ${day.meals}`, bodyWidth, 9);
      const overnight = linesFor(`Stay: ${day.stay}`, bodyWidth, 9);
      const blockHeight = title.length * 16 + places.length * 14 + description.length * 14.5 + (meals.length + overnight.length) * 13 + 42;
      if (y + blockHeight > BOTTOM) newPage('The journey continues.', `${trip.title}  |  Proposed day-by-day itinerary`);
      rect(M, y, 37, 28, C.lime);
      text(String(index + 1).padStart(2, '0'), M + 10, y + 6, { size: 11, font: heading });
      let contentY = linesAt(title, bodyX, y, { size: 12, font: semibold, leading: 16 }) + 5;
      contentY = linesAt(places, bodyX, contentY, { size: 9.5, fill: C.muted, leading: 14 }) + 9;
      contentY = linesAt(description, bodyX, contentY, { size: 10, leading: 14.5 }) + 9;
      contentY = linesAt(meals, bodyX, contentY, { size: 9, font: regular, fill: C.muted, leading: 13 });
      contentY = linesAt(overnight, bodyX, contentY, { size: 9, font: regular, fill: C.muted, leading: 13 });
      rule(contentY + 16);
      y = contentY + 32;
    }

    newPage('The details that matter.', `${trip.title}  |  ${itineraryOnly ? 'Standard and Comfort options' : stay.label + ' stay'}  |  Sample package scope`);
    function ensure(height) {
      if (y + height > BOTTOM) newPage('A little more to know.', `${trip.title}  |  Package details continued`);
    }
    function list(label, items) {
      const wrapped = items.map(item => linesFor(item, CW - 18, 10));
      ensure(26 + wrapped.reduce((height, lines) => height + lines.length * 14 + 7, 0));
      section(label);
      for (const lines of wrapped) {
        page.drawCircle({ x: M + 3, y: H - y - 6, size: 2, color: C.orange });
        y = linesAt(lines, M + 18, y, { size: 10, leading: 14 }) + 7;
      }
      y += 14;
    }
    function note(label, value) {
      const lines = linesFor(value, CW, 9.5);
      ensure(26 + lines.length * 14 + 14);
      section(label);
      y = linesAt(lines, M, y, { size: 9.5, fill: C.muted, leading: 14 }) + 18;
    }
    list('IN THE SAMPLE PACKAGE', trip.inclusions);
    list('BUDGET SEPARATELY FOR', trip.exclusions);
    note('ABOUT THE BONFIRE', trip.bonfire);
    note('BEFORE YOU SET OFF', trip.accessNote);
    note('CONFIRM WITH THE TEAM', 'Confirm dates, prices, applicable taxes, availability, room sharing, inclusions and cancellation terms directly with Trippy Trail before a real booking. No enquiry or booking has been sent by this page.');
    ensure(35);
    text('Discuss your trip: instagram.com/trippy.trail_/', M, y, { size: 10, font: semibold });

    const pages = documentPdf.getPages();
    pages.forEach((item, index) => {
      page = item;
      rule(787);
      text(`${reference}  |  Sample only`, M, 798, { size: 8, fill: C.muted });
      right(`${index + 1} / ${pages.length}`, 798, 8, regular);
    });
    return { bytes: await documentPdf.save(), filename: itineraryOnly ? `Trippy_Trail_${trip.id}_Itinerary.pdf` : `Trippy_Trail_${trip.id}_Estimate_${reference}.pdf` };
  }

  window.TrippyEstimatePDF = Object.freeze({ create });
})();

(() => {
  'use strict';
  const catalog = window.TRIPPY_TRIPS || {};
  const policy = window.TRIPPY_BOOKING_POLICY || { minimumPeople: 8, discountPercent: 5, maximumPeople: 30 };
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const money = paise => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: paise % 100 === 0 ? 0 : 2, maximumFractionDigits: 2 }).format(paise / 100);
  const safe = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const arrow = '<svg class="icon" aria-hidden="true"><use href="#icon-diagonal"/></svg>';

  // Prices use integer paise throughout. This calculation is an illustration, not a server-authoritative quote.
  function quote(tripId, packageKey, people) {
    if (!Object.hasOwn(catalog, tripId) || !Object.hasOwn(catalog[tripId].packages, packageKey)) return null;
    if (!Number.isInteger(people) || people < 1 || people > policy.maximumPeople) return null;
    const unitPaise = catalog[tripId].packages[packageKey].pricePaise;
    const subtotalPaise = unitPaise * people;
    const discountPercent = people >= policy.minimumPeople ? policy.discountPercent : 0;
    const discountPaise = Math.round(subtotalPaise * discountPercent / 100);
    const totalPaise = subtotalPaise - discountPaise;
    return Object.freeze({ tripId, packageKey, people, unitPaise, subtotalPaise, discountPercent, discountPaise, totalPaise, perPersonPaise: Math.round(totalPaise / people), currency: 'INR', isDemo: true });
  }

  window.TrippyBooking = { quote, formatMoney: money };
  const section = $('#trip-details');
  const dialog = $('#booking-dialog');
  if (!section || !dialog) return;
  let selectedTrip = 'shangarh';
  let bookingOpener = null;
  let draft = null;
  let demoReference = '';
  const methods = { upi: 'UPI', card: 'Debit / credit card', bank: 'Net banking' };
  // Live mode (config.js: TRIPPY_API.enabled). Real departures, seats and a real seat hold from the Trippy Trail API.
  const live = window.TrippyLive && window.TrippyLive.enabled ? window.TrippyLive : null;
  let liveData = null;
  let liveFailed = false;
  const departureIdFor = (tripId, date) => liveData?.trips[tripId]?.departures.find(d => d.startDate === date)?.id;
  const seatsLeftFor = (tripId, date) => liveData?.trips[tripId]?.departures.find(d => d.startDate === date)?.seatsLeft ?? 0;
  function liveError(message) {
    const box = $('#booking-live-error');
    box.textContent = message || '';
    box.hidden = !message;
  }

  function renderDetails(key) {
    if (!Object.hasOwn(catalog, key)) return;
    selectedTrip = key;
    const trip = catalog[key];
    $$('[data-trip-select]').forEach(button => {
      const selected = button.dataset.tripSelect === key;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    const panel = $('#trip-detail-panel');
    panel.setAttribute('aria-labelledby', `details-tab-${key}`);
    panel.innerHTML = `
      <div class="trip-overview">
        <figure class="trip-detail-photo"><img src="${safe(trip.image)}" alt="${safe(trip.imageAlt)}" width="900" height="650" loading="lazy" decoding="async"><div class="trip-photo-title"><span>${safe(trip.region)}</span><h3>${safe(trip.title)}</h3><b>${safe(trip.duration)}</b></div><figcaption>${safe(trip.imageCaption)}</figcaption></figure>
        <div class="trip-detail-intro"><p class="eyebrow">A PROPOSED JOURNEY</p><h3>${safe(trip.headline)}</h3><p>${safe(trip.description)}</p><ul class="trip-place-tags" aria-label="Proposed places to visit">${trip.places.map(place => `<li>${safe(place)}</li>`).join('')}</ul><div class="trip-detail-rate"><span>Sample range · per person</span><strong>${money(trip.packages.standard.pricePaise)} <i>—</i> ${money(trip.packages.comfort.pricePaise)}</strong><p>Standard to Comfort · before applicable taxes</p></div><button type="button" class="button button-orange" data-book="${safe(key)}">Build my trip estimate ${arrow}</button></div>
      </div>
      <div class="trip-essential-grid"><div><span class="trip-essential-icon" aria-hidden="true">☾</span><div><span>THE STAY</span><strong>${safe(trip.staySummary)}</strong><p>Standard: ${safe(trip.packages.standard.stay)}. Comfort: ${safe(trip.packages.comfort.stay)}.</p></div></div><div><span class="trip-essential-icon" aria-hidden="true">☀</span><div><span>AT THE TABLE</span><strong>${safe(trip.mealSummary)}</strong><p>Meal days are listed below. Share any dietary needs with the team before confirming.</p></div></div><div><span class="trip-essential-icon" aria-hidden="true">↗</span><div><span>START &amp; FINISH</span><strong>${safe(trip.start)}</strong><p>${safe(trip.transferNote)}</p></div></div></div>
      <div class="trip-plan-grid"><div class="trip-day-plan"><div class="trip-subheading"><span>01</span><h3>A day-by-day kind of escape.</h3></div><ol class="trip-day-list">${trip.itinerary.map((day, index) => `<li><details class="trip-itinerary-day"${index === 0 ? ' open' : ''}><summary><span class="trip-day-number">DAY ${String(index + 1).padStart(2, '0')}</span><span class="trip-day-summary"><strong>${safe(day.title)}</strong><small>${safe(day.places)}</small></span><span class="trip-day-expand" aria-hidden="true">+</span></summary><div class="trip-day-content"><p>${safe(day.description)}</p><div class="trip-day-meta"><span><b>Meals</b>${safe(day.meals)}</span><span><b>Stay</b>${safe(day.stay)}</span></div></div></details></li>`).join('')}</ol></div><div class="trip-inclusion-column"><div class="trip-inclusion-box"><div class="trip-subheading"><span>02</span><h3>In the sample package.</h3></div><ul class="trip-included-list">${trip.inclusions.map(item => `<li>${safe(item)}</li>`).join('')}</ul></div><div class="trip-exclusion-box"><h4>Budget separately for</h4><ul>${trip.exclusions.map(item => `<li>${safe(item)}</li>`).join('')}</ul></div></div></div>
      <div class="trip-good-to-know"><div><span class="trip-fire-mark" aria-hidden="true"><svg class="logo-inline" viewBox="0 0 48 48" focusable="false" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="#ff6500"/><g transform="translate(6.14 6.14) scale(.744)" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 14c2 0 2 22 11 22s10-22 11-22M8 15c3-4 8-4 11-3m10 0c4-1 8 0 11 3"/></g></svg></span><h4>About the bonfire</h4><p>${safe(trip.bonfire)}</p></div><div><span class="trip-fire-mark" aria-hidden="true">↗</span><h4>Before you set off</h4><p>${safe(trip.accessNote)}</p></div></div>
      <div class="trip-details-bottom"><p>Like the sound of this one?<br><strong>See what it looks like for your group.</strong></p><div class="trip-details-actions"><button type="button" class="button button-outline" data-itinerary-pdf="${safe(key)}"><span>Download itinerary PDF</span> ${arrow}</button><button type="button" class="button button-dark" data-book="${safe(key)}">Explore sample pricing ${arrow}</button><a class="button button-outline contact-btn" data-contact="whatsapp" data-source="trip" data-trip-title="${safe(trip.title)}" href="#" target="_blank" rel="noopener noreferrer" hidden>Ask on WhatsApp</a><a class="button button-outline contact-btn" data-contact="call" href="#" hidden>Call us</a></div></div><p class="trip-itinerary-status" id="trip-itinerary-status" role="status" aria-live="polite"></p>`;
    document.dispatchEvent(new CustomEvent('trippy:trip-details', { detail: { key } }));
  }

  $$('[data-trip-select]').forEach(button => {
    button.addEventListener('click', () => renderDetails(button.dataset.tripSelect));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const buttons = $$('[data-trip-select]');
      const current = buttons.indexOf(button);
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
      renderDetails(buttons[index].dataset.tripSelect);
      buttons[index].focus();
    });
  });

  function showTripDetails(key, moveFocus = true) {
    if (!Object.hasOwn(catalog, key)) return;
    $$('dialog[open]').forEach(other => other.close());
    renderDetails(key);
    const reduceMotion = document.documentElement.dataset.motion === 'off' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    if (moveFocus) $(`#details-tab-${key}`).focus({ preventScroll: true });
  }

  function minimumDate() {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const value = type => Number(parts.find(part => part.type === type).value);
    return new Date(Date.UTC(value('year'), value('month') - 1, value('day') + 1)).toISOString().slice(0, 10);
  }

  const departureRules = { shangarh: { dow: 5, step: 7, count: 20 }, jibhi: { dow: 4, step: 7, count: 20 }, kashmir: { dow: 6, step: 14, count: 12 } };
  function iso(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
  function departuresFor(tripId) {
    const tomorrow = minimumDate();
    const custom = ((window.TRIPPY_DEPARTURES || {})[tripId] || []).filter(v => /^\d{4}-\d{2}-\d{2}$/.test(v) && v >= tomorrow).sort();
    if (custom.length) return custom;
    const rule = departureRules[tripId] || departureRules.shangarh;
    const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + 7);
    while (d.getDay() !== rule.dow) d.setDate(d.getDate() + 1);
    return Array.from({ length: rule.count }, (_, i) => { const x = new Date(d); x.setDate(d.getDate() + i * rule.step); return iso(x); });
  }
  function fillDepartures(keep = '') {
    const select = $('#booking-date');
    const tripId = $('#booking-destination').value;
    const fmt = v => new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${v}T00:00:00Z`));
    if (live) {
      const open = (liveData?.trips[tripId]?.departures || []).filter(d => d.seatsLeft > 0);
      const list = open.map(d => d.startDate);
      select.replaceChildren(new Option(liveFailed ? 'Booking unavailable right now' : liveData ? (open.length ? 'Choose a departure' : 'No departures open yet') : 'Loading departures…', ''), ...open.map(d => new Option(`${fmt(d.startDate)} · ${d.seatsLeft} seat${d.seatsLeft === 1 ? '' : 's'} left`, d.startDate)));
      select.value = list.includes(keep) ? keep : '';
      return;
    }
    const list = departuresFor(tripId);
    select.replaceChildren(new Option('Choose a departure', ''), ...list.map(v => new Option(fmt(v), v)));
    select.value = list.includes(keep) ? keep : '';
  }
  function displayDate(value) {
    return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
  }

  function currentPackage() { return $('input[name="booking-package"]:checked', dialog)?.value || 'standard'; }
  function currentQuote() { return quote($('#booking-destination').value, currentPackage(), Number($('#booking-people').value)); }

  function updateQuote() {
    const trip = catalog[$('#booking-destination').value];
    if (!trip) return;
    const peopleField = $('#booking-people');
    const people = Number(peopleField.value);
    const result = currentQuote();
    const valid = Boolean(result);
    const error = valid ? '' : 'Enter a whole number from 1 to 30 travellers.';
    peopleField.setCustomValidity(error);
    $('#booking-people-error').hidden = valid;
    $('#booking-people-error').textContent = error;
    peopleField.setAttribute('aria-invalid', String(!valid));
    $('#booking-minus').disabled = valid && people <= 1;
    $('#booking-plus').disabled = valid && people >= policy.maximumPeople;
    for (const packageKey of ['standard', 'comfort']) {
      $(`#package-${packageKey}-price`).textContent = money(trip.packages[packageKey].pricePaise);
      $(`#package-${packageKey}-stay`).textContent = trip.packages[packageKey].stay;
    }
    $('#booking-summary-image').src = trip.image;
    $('#booking-summary-image').alt = trip.imageAlt;
    $('#booking-summary-title').textContent = trip.title;
    $('#booking-summary-duration').textContent = trip.duration;
    $('#booking-summary-route').textContent = `${trip.start} → ${trip.end}`;
    $('#booking-summary-stay').textContent = trip.staySummary;
    $('#booking-summary-meals').textContent = trip.mealSummary;
    $('#booking-unit-label').textContent = valid ? `${money(result.unitPaise)} × ${people} traveller${people === 1 ? '' : 's'}` : 'Choose 1–30 travellers';
    $('#booking-subtotal').textContent = valid ? money(result.subtotalPaise) : '—';
    $('#booking-discount-label').textContent = valid ? `${result.discountPercent}%` : '0%';
    $('#booking-discount').textContent = valid && result.discountPaise ? `−${money(result.discountPaise)}` : money(0);
    $('#booking-total').textContent = valid ? money(result.totalPaise) : '—';
    $('#booking-per-person').textContent = valid ? `${money(result.perPersonPaise)} per person` : 'Enter the number of travellers to see a total.';
    $('.booking-saving-line').classList.toggle('offer-applied', valid && result.discountPercent > 0);
    const groupStatus = $('#booking-group-status');
    groupStatus.classList.toggle('unlocked', valid && result.discountPercent > 0);
    $('p', groupStatus).textContent = !valid ? 'Your group saving will update once the traveller count is valid.' : result.discountPercent > 0 ? `Group offer applied: ${result.discountPercent}% off. Your group saves ${money(result.discountPaise)}.` : people === policy.minimumPeople - 1 ? 'Add 1 more traveller to unlock the sample 5% group saving.' : 'Bring 8 or more travellers to unlock the sample 5% group saving.';
  }

  $('#booking-date').addEventListener('change', () => { $('#booking-date-error').hidden = true; $('#booking-date').removeAttribute('aria-invalid'); });

  function setStep(step, focus = true) {
    $$('[data-booking-step]', dialog).forEach(element => { element.hidden = element.dataset.bookingStep !== step; });
    const steps = ['details', 'payment', 'receipt'];
    $$('[data-booking-progress]', dialog).forEach(element => {
      const isCurrent = element.dataset.bookingProgress === step;
      element.classList.toggle('active', isCurrent);
      element.classList.toggle('complete', steps.indexOf(element.dataset.bookingProgress) < steps.indexOf(step));
      if (isCurrent) element.setAttribute('aria-current', 'step'); else element.removeAttribute('aria-current');
    });
    dialog.scrollTop = 0;
    if (focus) {
      const focusElement = step === 'details' ? $('#booking-destination') : step === 'payment' ? $('#payment-step-title') : $('#booking-receipt-title');
      // On a phone the compact estimate sits above the fields. Let focus reveal the active step.
      focusElement.focus();
    }
  }

  function getDraft() {
    const result = currentQuote();
    if (!result) return null;
    return { mode: 'demo', tripId: result.tripId, tripTitle: catalog[result.tripId].title, packageKey: result.packageKey, people: result.people, preferredArrival: $('#booking-date').value, leadName: $('#booking-name').value.trim(), quote: { ...result } };
  }

  // Show the live wording and contact fields; swap demo copy for real copy.
  function applyLiveCopy() {
    if (!live) return;
    $('#booking-contact-fields').hidden = false;
    $('#booking-people').closest('.booking-travellers').querySelector('p').textContent = '1–30 travellers';
    $('#booking-date-note').textContent = 'Only dates when this trip is running. Seats left are shown.';
    $('#booking-details-form .booking-continue').firstChild.textContent = 'Continue ';
    $('#booking-details-form .booking-bottom-note').textContent = 'Your seats are held for 30 minutes once you continue to payment.';
    $('#download-booking-estimate').hidden = true;
    $('#booking-edit-estimate').hidden = true;
  }
  async function prepareLive() {
    if (!live) return;
    liveError('');
    const continueButton = $('#booking-details-form .booking-continue');
    continueButton.disabled = true;
    try {
      liveData = await live.load(true);
      liveFailed = false;
      // The server's prices are the real ones; show them in the estimate too.
      for (const [id, t] of Object.entries(liveData.trips)) {
        if (catalog[id]) { catalog[id].packages.standard.pricePaise = t.standardPaise; catalog[id].packages.comfort.pricePaise = t.comfortPaise; }
      }
      continueButton.disabled = false;
    } catch (error) {
      liveFailed = true;
      liveError(error.message);
    }
    fillDepartures($('#booking-date').value);
    updateQuote();
  }

  function openBooking(key = selectedTrip, trigger = document.activeElement) {
    if (!Object.hasOwn(catalog, key)) key = 'shangarh';
    bookingOpener = trigger;
    $$('dialog[open]').forEach(other => { if (other !== dialog) other.close(); });
    $('#booking-destination').value = key;
    fillDepartures();
    $('#booking-date').setCustomValidity('');
    $('#booking-download-status').textContent = '';
    draft = null;
    demoReference = '';
    liveBooking = null;
    applyLiveCopy();
    prepareLive();
    updateQuote();
    setStep('details', false);
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    $('#booking-title').tabIndex = -1;
    $('#booking-title').focus({ preventScroll: true });
  }

  document.addEventListener('click', event => {
    const bookingButton = event.target.closest?.('[data-book]');
    if (bookingButton) {
      event.preventDefault();
      openBooking(bookingButton.dataset.book || selectedTrip, bookingButton);
      return;
    }
    const detailsButton = event.target.closest?.('[data-trip-details]');
    if (detailsButton) {
      event.preventDefault();
      showTripDetails(detailsButton.dataset.tripDetails || selectedTrip);
    }
  });
  $$('[data-booking-close]', dialog).forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if ($('dialog[open]')) return;
    document.body.style.overflow = '';
    const parentDialog = bookingOpener?.closest?.('dialog');
    if (bookingOpener?.isConnected && bookingOpener.getClientRects().length && (!parentDialog || parentDialog.open)) bookingOpener.focus({ preventScroll: true });
    else if (bookingOpener?.closest?.('#mobile-nav')) $('.menu-toggle')?.focus({ preventScroll: true });
    else ($$('[data-book]').find(button => button.getClientRects().length) || $('.menu-toggle'))?.focus({ preventScroll: true });
  });

  $('#booking-destination').addEventListener('change', () => { fillDepartures(); updateQuote(); });
  $$('input[name="booking-package"]', dialog).forEach(input => input.addEventListener('change', updateQuote));
  $('#booking-people').addEventListener('input', updateQuote);
  $('#booking-minus').addEventListener('click', () => {
    const current = Number($('#booking-people').value);
    $('#booking-people').value = String(Math.max(1, Math.min(policy.maximumPeople, Number.isInteger(current) ? current - 1 : 1)));
    updateQuote();
  });
  $('#booking-plus').addEventListener('click', () => {
    const current = Number($('#booking-people').value);
    $('#booking-people').value = String(Math.max(1, Math.min(policy.maximumPeople, Number.isInteger(current) ? current + 1 : 1)));
    updateQuote();
  });
  $('#booking-date').addEventListener('input', () => $('#booking-date').setCustomValidity(''));
  $('#booking-details-form').addEventListener('submit', event => {
    event.preventDefault();
    updateQuote();
    const dateField = $('#booking-date');
    dateField.setCustomValidity('');
    const dateError = $('#booking-date-error');
    if (!dateField.value || !dateField.checkValidity()) {
      // Browser validation bubbles are hidden inside some embedded views, so show the message on the page too.
      dateError.textContent = !dateField.value ? 'Please choose one of the departure dates to continue.' : dateField.validationMessage;
      dateError.hidden = false;
      dateField.setAttribute('aria-invalid', 'true');
      dateField.scrollIntoView({ block: 'center', behavior: 'auto' });
      dateField.focus({ preventScroll: true });
      return;
    }
    dateError.hidden = true;
    dateField.removeAttribute('aria-invalid');
    if (!event.currentTarget.reportValidity()) return;
    draft = getDraft();
    if (!draft) return;
    if (live) {
      liveError('');
      const phone = $('#booking-phone').value.trim();
      if (!/^\+?[0-9][0-9 \-]{6,18}$/.test(phone)) { liveError('Please enter a valid phone number so the team can reach you.'); $('#booking-phone').focus(); draft = null; return; }
      if (draft.leadName.length < 2) { liveError('Please enter the lead traveller name.'); $('#booking-name').focus(); draft = null; return; }
      const left = seatsLeftFor(draft.tripId, draft.preferredArrival);
      if (draft.people > left) { liveError(left > 0 ? `Only ${left} seat${left === 1 ? '' : 's'} left on that date.` : 'That departure is full.'); draft = null; return; }
      draft.phone = phone;
      draft.email = $('#booking-email').value.trim();
      $('#pay-badge').textContent = liveData?.payments?.enabled ? (liveData.payments.mode === 'test' ? 'TEST PAYMENT' : 'SECURE PAYMENT') : 'RESERVE YOUR SEATS';
      $('#payment-step-title').textContent = liveData?.payments?.enabled ? 'Pay securely.' : 'Hold your seats.';
      $('#pay-lead').textContent = liveData?.payments?.enabled ? `You pay ${money(draft.quote.totalPaise)} through Razorpay. UPI, cards and net banking are available in the payment window.` : `Online payment is not switched on yet. Your seats are held for 30 minutes and the team will contact you on ${phone} to confirm.`;
      $('#pay-explainer').textContent = liveData?.payments?.mode === 'test' ? 'Test mode: no real money is charged. Use Razorpay test details only.' : 'The price is calculated again by our server when you continue.';
      $('.payment-methods').hidden = true;
      $('#pay-submit').firstChild.textContent = liveData?.payments?.enabled ? `Pay ${money(draft.quote.totalPaise)} ` : 'Hold my seats ';
      $('#booking-pay-error').hidden = true;
    }
    setStep('payment');
  });
  $('#booking-back-details').addEventListener('click', () => { liveBooking = null; setStep('details'); });
  $('#booking-edit-estimate').addEventListener('click', () => { draft = null; setStep('details'); });
  let liveBooking = null; // the held booking for this attempt, kept so a retry pays it instead of making a second hold
  let liveBusy = false;
  function showLiveReceipt(kind, note) {
    const confirmed = kind === 'confirmed';
    $('#receipt-badge').textContent = confirmed ? 'BOOKING CONFIRMED' : 'SEATS HELD';
    $('#booking-receipt-title').innerHTML = confirmed ? 'You are going!' : 'Seats held.';
    $('#receipt-lead').textContent = note;
    $('#receipt-date-label').textContent = 'Departure';
    $('#receipt-method-label').textContent = 'Total';
    $('#receipt-reference-label').textContent = 'Booking reference';
    $('#receipt-trip').textContent = `${draft.tripTitle} · ${catalog[draft.tripId].duration}`;
    $('#receipt-date').textContent = displayDate(draft.preferredArrival);
    $('#receipt-people').textContent = `${draft.people} traveller${draft.people === 1 ? '' : 's'} · ${catalog[draft.tripId].packages[draft.packageKey].label}`;
    $('#receipt-method').textContent = money(liveBooking.quote.totalPaise);
    $('#receipt-reference').textContent = liveBooking.reference;
    setStep('receipt');
  }
  async function submitLive() {
    if (liveBusy) return;
    liveBusy = true;
    const button = $('#pay-submit');
    const error = $('#booking-pay-error');
    error.hidden = true;
    button.disabled = true;
    try {
      if (!liveBooking) {
        const departureId = departureIdFor(draft.tripId, draft.preferredArrival);
        if (!departureId) throw new Error('That departure is no longer available. Please go back and choose another date.');
        liveBooking = await live.book({ departureId, package: draft.packageKey, travellers: draft.people, name: draft.leadName, phone: draft.phone, email: draft.email || undefined });
      }
      if (!liveData?.payments?.enabled) { showLiveReceipt('held', 'Your seats are held for 30 minutes. The team will contact you to confirm and arrange payment. Please keep this reference.'); return; }
      const result = await live.pay(liveBooking.reference, { description: `${draft.tripTitle} · ${draft.people} traveller${draft.people === 1 ? '' : 's'}`, name: draft.leadName, phone: draft.phone, email: draft.email });
      if (result.cancelled) { error.textContent = 'Payment was not completed. Your seats stay held until the timer ends; you can try again.'; error.hidden = false; return; }
      showLiveReceipt(result.status === 'confirmed' && !result.needsReview ? 'confirmed' : 'held', result.note);
    } catch (e) {
      if (e.status === 409 || e.status === 404) liveBooking = null; // hold gone or full: a new attempt must start from the details step
      error.textContent = e.message;
      error.hidden = false;
    } finally {
      liveBusy = false;
      button.disabled = false;
    }
  }
  $('#booking-payment-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!draft) { setStep('details'); return; }
    if (live) { submitLive(); return; }
    const method = $('input[name="payment-method"]:checked', dialog)?.value;
    if (!Object.hasOwn(methods, method)) return;
    draft.method = method;
    demoReference = `DEMO-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    $('#receipt-trip').textContent = `${draft.tripTitle} · ${catalog[draft.tripId].duration}`;
    $('#receipt-date').textContent = `${displayDate(draft.preferredArrival)} · sample departure`;
    $('#receipt-people').textContent = `${draft.people} traveller${draft.people === 1 ? '' : 's'} · ${catalog[draft.tripId].packages[draft.packageKey].label}`;
    $('#receipt-method').textContent = methods[method];
    $('#receipt-reference').textContent = demoReference;
    setStep('receipt');
  });

  $('#download-booking-estimate').addEventListener('click', async event => {
    if (!draft || !demoReference) return;
    const button = event.currentTarget;
    if (button.disabled) return;
    const label = $('span', button);
    const status = $('#booking-download-status');
    const exportDraft = { ...draft, quote: { ...draft.quote } };
    const reference = demoReference;
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    label.textContent = 'Preparing your PDF…';
    status.textContent = 'Creating your PDF estimate with the trip details and itinerary.';
    try {
      const result = await window.TrippyEstimatePDF.create({ draft: exportDraft, trip: catalog[exportDraft.tripId], reference, methodLabel: methods[exportDraft.method], formatMoney: money, formatDate: displayDate });
      const url = URL.createObjectURL(new Blob([result.bytes], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = result.filename;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
      status.textContent = 'PDF download started. Check your Downloads folder. No booking has been sent.';
    } catch (error) {
      console.error('Estimate PDF could not be created:', error);
      status.textContent = 'The PDF could not be created. Please try again, or reopen this page and rebuild your estimate.';
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
      label.textContent = 'Download my estimate (PDF)';
    }
  });

  $('#trip-detail-panel').addEventListener('click', async event => {
    const button = event.target.closest('[data-itinerary-pdf]');
    if (!button || button.disabled) return;
    const key = button.dataset.itineraryPdf;
    if (!Object.hasOwn(catalog, key)) return;
    const label = $('span', button);
    const status = $('#trip-itinerary-status');
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    label.textContent = 'Preparing PDF…';
    if (status) status.textContent = 'Creating the itinerary PDF…';
    try {
      const result = await window.TrippyEstimatePDF.create({ itineraryOnly: true, draft: { packageKey: 'standard', people: 1, quote: null }, trip: catalog[key], reference: `TT-ITIN-${key.toUpperCase()}`, methodLabel: '', formatMoney: money, formatDate: displayDate });
      const url = URL.createObjectURL(new Blob([result.bytes], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = result.filename;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
      const live = $('#trip-itinerary-status');
      if (live) live.textContent = 'Itinerary PDF download started. It is a sample plan, not a confirmed departure.';
    } catch (error) {
      console.error('Itinerary PDF could not be created:', error);
      const live = $('#trip-itinerary-status');
      if (live) live.textContent = 'The itinerary PDF could not be created. Please try again, or reopen this page.';
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
      label.textContent = 'Download itinerary PDF';
    }
  });

  Object.assign(window.TrippyBooking, { open: openBooking, showDetails: showTripDetails, getDraft });
  renderDetails(selectedTrip);
  updateQuote();
})();

(() => {
  'use strict';
  const section = document.querySelector('#gallery');
  if (!section) return;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  const locations = { shangarh: 'Shangarh', jibhi: 'Jibhi & Shoja', kashmir: 'Kashmir', other: 'Another trail' };
  const MAX_PHOTOS = 12;
  const MAX_FILE_BYTES = 10 * 1024 * 1024;
  const MAX_IMAGE_EDGE = 1800;
  const DATABASE = 'trippy-trail-gallery';
  const STORE = 'photos';
  const REVISION_KEY = 'trippy-trail:gallery:revision:v1';
  const seedPhotos = [
    { id: 'web-jibhi-valley', trip: 'jibhi', caption: 'A little room to breathe.', src: 'assets/img/jibhi-mist-hills-hero.webp', alt: 'Mist over forested hills and snowy ridges in Jibhi, Himachal Pradesh', author: 'Aryan Nikhil', source: 'https://unsplash.com/photos/green-trees-on-mountain-during-daytime-jSyzETbKch4', width: 1800, height: 830, ratio: 1.3, mobileRatio: .88 },
    { id: 'web-shangarh-meadow', trip: 'shangarh', caption: 'Take the slow way.', src: 'assets/img/shangarh-green-meadows.webp', alt: 'Green Shangarh meadows beneath forested mountains', author: 'Gunjan Jha', source: 'https://unsplash.com/photos/brown-cow-on-green-grass-field-near-green-trees-and-mountains-under-blue-and-white-cloudy-MqnQzSj-mnE', width: 1800, height: 1200, ratio: 1.07, mobileRatio: .95 },
    { id: 'web-jibhi-canopy', trip: 'jibhi', caption: 'Look up. Stay a while.', src: 'assets/img/jibhi-forest-canopy.webp', alt: 'A view up through the forest canopy in Jibhi', author: 'Shubham Nikam', source: 'https://unsplash.com/photos/a-group-of-trees-that-are-standing-in-the-grass-Ur4TYPpT_Ok', width: 1350, height: 1800, ratio: .82, mobileRatio: .75 },
    { id: 'web-shangarh-sunset', trip: 'shangarh', caption: 'Chasing the last light.', src: 'assets/img/shangarh-village-sunset.webp', alt: 'A village path and sunset-lit mountains in Shangarh', author: 'Lakshit Somani', source: 'https://unsplash.com/photos/a-dirt-road-in-front-of-a-mountain-range-Xs9piDwbP5Q', width: 1800, height: 1013, ratio: 1.55, mobileRatio: 1.02 },
    { id: 'web-kashmir-gadsar', trip: 'kashmir', caption: 'Meet your new perspective.', src: 'assets/img/kashmir-gadsar-lake.webp', alt: 'Turquoise Gadsar Lake beneath rocky peaks in Kashmir', author: 'Vivek', source: 'https://unsplash.com/photos/lake-in-the-middle-of-mountains-gUsAcu6Ba_A', width: 1800, height: 1200, ratio: 1.05, mobileRatio: .82 },
    { id: 'web-jibhi-mountains', trip: 'jibhi', caption: 'This is your sign to go.', src: 'assets/img/jibhi-mountain-views.webp', alt: 'Snow-covered mountains framed by pine branches, photographed from Jibhi', author: 'ASHISH RASTOGI', source: 'https://unsplash.com/photos/a-view-of-a-mountain-range-from-a-distance-mJqT31Hrndo', width: 1800, height: 1013, ratio: 1.33, mobileRatio: .96 }
  ];
  let uploads = [];
  let activeFilter = 'all';
  let db = null;
  let canSave = false;
  let processing = false;
  let removing = false;
  let storageInitialized = false;
  let refreshPending = false;
  let refreshing = false;
  let mutationVersion = 0;
  let syncChannel = null;
  let lightboxItems = [];
  let lightboxIndex = 0;
  let lightboxTrigger = null;
  let previousOverflow = '';
  const objectURLs = new Set();
  const grid = $('#gallery-grid');
  const uploader = $('#gallery-uploader');
  const form = $('#gallery-upload-form');
  const status = $('#gallery-upload-status');
  const lightbox = $('#gallery-lightbox');

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('icon');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', `#icon-${name}`);
    svg.append(use);
    return svg;
  }
  function newURL(blob) {
    const url = URL.createObjectURL(blob);
    objectURLs.add(url);
    return url;
  }
  function revokeURL(url) {
    if (objectURLs.delete(url)) URL.revokeObjectURL(url);
  }
  function sourceLink(photo) {
    const link = element('a', '', `${photo.author} / Unsplash`);
    link.href = photo.source;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }
  function shownPhotos() {
    const all = [...uploads, ...seedPhotos];
    if (activeFilter === 'all') return all;
    if (activeFilter === 'uploads') return uploads;
    return all.filter(photo => photo.trip === activeFilter);
  }
  function renderGallery(preserveFocus = false) {
    const focused = preserveFocus && grid.contains(document.activeElement) ? document.activeElement : null;
    const focusedPhoto = focused?.closest('.gallery-card')?.dataset.galleryId;
    const focusedControl = focused?.classList.contains('gallery-remove-photo') ? '.gallery-remove-photo' : focused?.tagName === 'A' ? 'a' : '.gallery-photo-button';
    const photos = shownPhotos();
    const cards = photos.map(photo => {
      const card = element('article', 'gallery-card');
      card.dataset.galleryId = photo.id;
      const open = element('button', 'gallery-photo-button');
      open.type = 'button';
      open.setAttribute('aria-label', `View photo: ${photo.caption}, ${locations[photo.trip]}`);
      open.style.setProperty('--gallery-ratio', String(photo.ratio || Math.max(.85, Math.min(1.5, photo.width / photo.height))));
      open.style.setProperty('--gallery-mobile-ratio', String(photo.mobileRatio || .9));
      const img = element('img');
      img.loading = 'lazy';
      img.decoding = 'async';
      if (/^assets\/img\/[a-z-]+\.webp$/.test(photo.src)) {
        img.sizes = '(max-width: 700px) 100vw, 33vw';
        img.srcset = `${photo.src.replace('.webp', '-800.webp')} 800w, ${photo.src} 1800w`;
      }
      img.src = photo.src;
      img.alt = photo.alt;
      img.width = photo.width;
      img.height = photo.height;
      const caption = element('span', 'gallery-photo-caption');
      const arrow = element('span');
      arrow.append(icon('diagonal'));
      caption.append(element('strong', '', photo.caption), arrow);
      open.append(img, element('span', 'gallery-location', locations[photo.trip]), caption);
      open.addEventListener('click', () => openLightbox(photo.id, open));
      const meta = element('div', 'gallery-card-meta');
      const byline = element('span');
      byline.append(photo.uploaded ? document.createTextNode('Your trip photo') : sourceLink(photo));
      meta.append(byline, element('span', '', photo.uploaded ? (photo.saved ? 'Saved on this device' : 'This session only') : 'Destination inspiration'));
      card.append(open, meta);
      if (photo.uploaded) {
        const remove = element('button', 'gallery-remove-photo');
        remove.type = 'button';
        remove.setAttribute('aria-label', `Remove your photo: ${photo.caption}`);
        remove.title = 'Remove this photo from your gallery';
        remove.append(icon('close'));
        remove.addEventListener('click', () => removePhoto(photo, remove));
        card.append(remove);
      }
      return card;
    });
    grid.replaceChildren(...cards);
    grid.hidden = !photos.length;
    $('#gallery-empty').hidden = Boolean(photos.length);
    $('#gallery-result-count').textContent = `${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}${activeFilter === 'uploads' ? ' from your trips' : ''}`;
    $('#gallery-upload-count').textContent = String(uploads.length);
    $$('[data-gallery-filter]').forEach(button => {
      const active = button.dataset.galleryFilter === activeFilter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    updateSelectionNote();
    if (focusedPhoto) {
      const card = Array.from(grid.children).find(item => item.dataset.galleryId === focusedPhoto);
      (card?.querySelector(focusedControl) || $('[data-gallery-filter="uploads"]')).focus({ preventScroll: true });
    }
  }
  function updateSelectionNote() {
    const count = $('#gallery-files').files.length;
    const spaces = Math.max(0, MAX_PHOTOS - uploads.length);
    $('#gallery-selection-note').textContent = uploads.length > MAX_PHOTOS
      ? `All ${uploads.length} photos are shown. Remove ${uploads.length - MAX_PHOTOS + 1} or more before adding another photo.`
      : count ? `${count} ${count === 1 ? 'photo selected' : 'photos selected'} · ${spaces} spaces left`
        : `${spaces} spaces left in your gallery.`;
  }
  function setFilter(value) {
    if (!['all', 'uploads', ...Object.keys(locations)].includes(value)) return;
    activeFilter = value;
    renderGallery();
  }
  $$('[data-gallery-filter]').forEach(button => button.addEventListener('click', () => setFilter(button.dataset.galleryFilter)));

  function openUploader(focus = true) {
    uploader.open = true;
    if (focus) $('#gallery-files').focus({ preventScroll: true });
    uploader.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
  }
  function scrollBehavior() {
    return document.documentElement.dataset.motion === 'off' || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }
  $('#gallery-add-photos').addEventListener('click', () => openUploader());
  $('#gallery-empty-upload').addEventListener('click', () => openUploader());
  uploader.addEventListener('toggle', () => $('#gallery-add-photos').setAttribute('aria-expanded', String(uploader.open)));
  $('#gallery-view-uploads').addEventListener('click', () => {
    uploader.open = false;
    setFilter('uploads');
    $('.gallery-toolbar').scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    $('[data-gallery-filter="uploads"]').focus({ preventScroll: true });
  });
  $('#gallery-files').addEventListener('change', () => {
    updateSelectionNote();
    $('#gallery-view-uploads').hidden = true;
    status.textContent = '';
    status.removeAttribute('data-error');
  });

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) { reject(new Error('Browser storage is unavailable.')); return; }
      let settled = false;
      let request;
      const timer = window.setTimeout(() => finish(null, new Error('Browser storage did not become available.')), 5000);
      function finish(database, error) {
        if (settled) { if (database) database.close(); return; }
        settled = true;
        window.clearTimeout(timer);
        if (error) reject(error); else resolve(database);
      }
      try { request = indexedDB.open(DATABASE, 1); }
      catch (error) { finish(null, error); return; }
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE, { keyPath: 'id' });
      };
      request.onsuccess = () => finish(request.result);
      request.onerror = () => finish(null, request.error || new Error('Browser storage is unavailable.'));
      request.onblocked = () => finish(null, new Error('Browser storage is busy in another tab.'));
    });
  }
  function storageTransaction(mode, action) {
    return new Promise((resolve, reject) => {
      let transaction;
      try {
        transaction = db.transaction(STORE, mode);
        const request = action(transaction.objectStore(STORE));
        transaction.oncomplete = () => resolve(request.result);
        transaction.onerror = () => reject(transaction.error || request.error || new Error('Photo storage failed.'));
        transaction.onabort = () => reject(transaction.error || new Error('Photo storage was interrupted.'));
      } catch (error) { reject(error); }
    });
  }
  function savePhotoWithinLimit(record) {
    return new Promise((resolve, reject) => {
      let transaction;
      let accepted = false;
      try {
        // IndexedDB serializes read/write transactions for this store across tabs.
        // Keep the capacity check and insert together; do not await between them.
        transaction = db.transaction(STORE, 'readwrite');
        const store = transaction.objectStore(STORE);
        const count = store.count();
        count.onsuccess = () => {
          if (count.result + uploads.filter(photo => !photo.saved).length >= MAX_PHOTOS) return;
          try {
            const insert = store.add(record);
            insert.onsuccess = () => { accepted = true; };
          } catch (error) { transaction.abort(); reject(error); }
        };
        transaction.oncomplete = () => resolve(accepted);
        transaction.onerror = () => reject(transaction.error || new Error('Photo storage failed.'));
        transaction.onabort = () => reject(transaction.error || new Error('Photo storage was interrupted.'));
      } catch (error) { reject(error); }
    });
  }
  function showSessionStorageNote() {
    $('#gallery-storage-note').textContent = 'Browser storage is unavailable or full. New photos stay in this tab for this visit and are not published for other visitors.';
  }
  function validStoredPhoto(record) {
    return record && typeof record.id === 'string' && record.id.length < 100 && Object.hasOwn(locations, record.trip) && typeof record.caption === 'string' && record.caption.length <= 90 && record.blob instanceof Blob && ['image/webp', 'image/jpeg', 'image/png'].includes(record.blob.type) && record.blob.size <= 2 * 1024 * 1024 && Number.isFinite(record.width) && Number.isFinite(record.height) && record.width > 0 && record.height > 0 && record.width <= MAX_IMAGE_EDGE && record.height <= MAX_IMAGE_EDGE;
  }
  function uploadedPhoto(record, saved) {
    return { ...record, uploaded: true, saved, src: newURL(record.blob), alt: `${record.caption} — photo from your ${locations[record.trip]} trip` };
  }
  function applyStoredPhotos(records) {
    const previous = new Map(uploads.filter(photo => photo.saved).map(photo => [photo.id, photo]));
    const saved = records.filter(validStoredPhoto).map(record => {
      const old = previous.get(record.id);
      return old && ['trip', 'caption', 'width', 'height', 'createdAt'].every(key => old[key] === record[key]) && old.blob.type === record.blob.type && old.blob.size === record.blob.size
        ? old : uploadedPhoto(record, true);
    });
    const savedIds = new Set(saved.map(photo => photo.id));
    // Never trim legacy excess records: every saved photo must remain removable.
    const next = [...uploads.filter(photo => !photo.saved && !savedIds.has(photo.id)), ...saved]
      .sort((a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0) || a.id.localeCompare(b.id));
    if (next.length === uploads.length && next.every((photo, index) => photo === uploads[index])) return;
    const retained = new Set(next.map(photo => photo.src));
    const removed = uploads.filter(photo => !retained.has(photo.src));
    uploads = next;
    renderGallery(true);
    removed.forEach(photo => revokeURL(photo.src));
  }
  async function readStoredPhotos() {
    if (!db) return;
    try { applyStoredPhotos(await storageTransaction('readonly', store => store.getAll())); }
    catch { canSave = false; showSessionStorageNote(); }
  }
  async function requestStorageRefresh() {
    refreshPending = true;
    if (!storageInitialized || !db || processing || removing || lightbox.open || refreshing) return;
    refreshing = true;
    refreshPending = false;
    const version = mutationVersion;
    try {
      const records = await storageTransaction('readonly', store => store.getAll());
      if (version !== mutationVersion || processing || removing || lightbox.open) refreshPending = true;
      else applyStoredPhotos(records);
    } catch { canSave = false; showSessionStorageNote(); }
    finally {
      refreshing = false;
      if (refreshPending && db && !processing && !removing && !lightbox.open) requestStorageRefresh();
    }
  }
  function announceStorageChange() {
    try { syncChannel?.postMessage('photos-changed'); } catch { /* Activation refresh remains available. */ }
    try { localStorage.setItem(REVISION_KEY, `${Date.now()}-${Math.random().toString(36).slice(2)}`); } catch { /* The channel or activation refresh can still sync photos. */ }
  }
  try {
    if ('BroadcastChannel' in window) {
      syncChannel = new BroadcastChannel('trippy-trail-gallery');
      syncChannel.onmessage = event => { if (event.data === 'photos-changed') requestStorageRefresh(); };
    }
  } catch { /* Storage events and activation refresh support restricted browsers. */ }
  window.addEventListener('storage', event => { if (event.key === REVISION_KEY || event.key === null) requestStorageRefresh(); });
  window.addEventListener('focus', requestStorageRefresh);
  window.addEventListener('pageshow', requestStorageRefresh);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) requestStorageRefresh(); });
  const storageReady = (async () => {
    try {
      db = await openDatabase();
      db.onversionchange = () => { db.close(); db = null; canSave = false; showSessionStorageNote(); };
      const records = await storageTransaction('readonly', store => store.getAll());
      applyStoredPhotos(records);
      canSave = true;
    } catch { canSave = false; showSessionStorageNote(); }
    storageInitialized = true;
    renderGallery();
    if (refreshPending) requestStorageRefresh();
  })();

  async function signatureType(file) {
    const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    if (header.length >= 3 && header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff) return 'image/jpeg';
    if (header.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((byte, index) => header[index] === byte)) return 'image/png';
    if (header.length >= 12 && String.fromCharCode(...header.slice(0, 4)) === 'RIFF' && String.fromCharCode(...header.slice(8, 12)) === 'WEBP') return 'image/webp';
    throw new Error('Choose a JPG, PNG or WebP photo.');
  }
  async function decodePhoto(file) {
    if (typeof createImageBitmap === 'function') {
      try {
        const bitmap = await createImageBitmap(file);
        return { image: bitmap, width: bitmap.width, height: bitmap.height, release: () => bitmap.close() };
      } catch { /* Older browsers may decode the same image through an img element. */ }
    }
    return new Promise((resolve, reject) => {
      const url = newURL(file);
      const img = new Image();
      img.onload = () => resolve({ image: img, width: img.naturalWidth, height: img.naturalHeight, release: () => revokeURL(url) });
      img.onerror = () => { revokeURL(url); reject(new Error('This photo could not be read. Try a different image.')); };
      img.src = url;
    });
  }
  function encodeCanvas(canvas, quality) {
    return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('This photo could not be prepared.')), 'image/webp', quality));
  }
  async function preparePhoto(file, trip, caption, index) {
    if (!file.size) throw new Error('This file is empty.');
    if (file.size > MAX_FILE_BYTES) throw new Error('Choose a photo smaller than 10 MB.');
    const type = await signatureType(file);
    if (file.type && file.type !== type) throw new Error('The file type does not match its image content.');
    const decoded = await decodePhoto(file);
    let canvas;
    try {
      if (!decoded.width || !decoded.height || decoded.width * decoded.height > 40000000) throw new Error('Choose a photo up to 40 megapixels.');
      const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(decoded.width, decoded.height));
      const width = Math.max(1, Math.round(decoded.width * scale));
      const height = Math.max(1, Math.round(decoded.height * scale));
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Photo processing is unavailable in this browser.');
      context.drawImage(decoded.image, 0, 0, width, height);
      let blob = await encodeCanvas(canvas, .83);
      if (blob.size > 2 * 1024 * 1024) blob = await encodeCanvas(canvas, .65);
      if (blob.size > 2 * 1024 * 1024) throw new Error('This image is still too large. Try a smaller photo.');
      const id = `upload-${typeof window.crypto?.randomUUID === 'function' ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
      return { id, trip, caption: caption || `${locations[trip]} memories`, blob, width, height, createdAt: Date.now() + index };
    } finally {
      decoded.release();
      if (canvas) { canvas.width = 1; canvas.height = 1; }
    }
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (removing) { status.textContent = 'Wait for the photo removal to finish, then try again.'; return; }
    if (processing || !form.reportValidity()) return;
    processing = true;
    mutationVersion += 1;
    form.setAttribute('aria-busy', 'true');
    $('#gallery-upload-fields').disabled = true;
    $('#gallery-view-uploads').hidden = true;
    status.removeAttribute('data-error');
    status.textContent = 'Getting your gallery ready…';
    let added = 0;
    let saved = 0;
    const errors = [];
    try {
      await storageReady;
      await readStoredPhotos();
      const files = Array.from($('#gallery-files').files);
      const slots = Math.max(0, MAX_PHOTOS - uploads.length);
      if (!slots) { status.textContent = `Your gallery has ${uploads.length} uploaded photos. Remove ${uploads.length - MAX_PHOTOS + 1} or more to make room for a new moment.`; status.dataset.error = 'true'; return; }
      const chosen = files.slice(0, slots);
      if (files.length > slots) errors.push(`${files.length - slots} ${files.length - slots === 1 ? 'photo was' : 'photos were'} skipped because this gallery holds 12 uploads.`);
      const trip = Object.hasOwn(locations, $('#gallery-trip').value) ? $('#gallery-trip').value : 'other';
      const caption = $('#gallery-caption').value.trim().slice(0, 90);
      for (let index = 0; index < chosen.length; index += 1) {
        const file = chosen[index];
        status.textContent = `Preparing photo ${index + 1} of ${chosen.length}…`;
        try {
          const record = await preparePhoto(file, trip, caption, index);
          let stored = false;
          if (canSave) {
            try {
              stored = await savePhotoWithinLimit(record);
              if (!stored) {
                errors.push('The gallery reached its 12-photo limit, possibly in another tab. Remove a photo before adding more.');
                break;
              }
              saved += 1;
            }
            catch { canSave = false; showSessionStorageNote(); }
          }
          uploads.unshift(uploadedPhoto(record, stored));
          added += 1;
        } catch (error) { errors.push(`${file.name.slice(0, 80)}: ${error.message || 'This photo could not be added.'}`); }
      }
      if (added) {
        setFilter('uploads');
        form.reset();
        updateSelectionNote();
        $('#gallery-view-uploads').hidden = false;
      }
      await readStoredPhotos();
      const summary = added ? `${added} ${added === 1 ? 'photo added' : 'photos added'}. ${saved === added ? 'Saved in this browser on this device.' : `${saved ? `${saved} saved on this device; ` : ''}${added - saved} ${added - saved === 1 ? 'photo stays' : 'photos stay'} in this tab for this visit.`}` : 'No photos were added.';
      status.textContent = [summary, ...errors.slice(0, 4), errors.length > 4 ? `Plus ${errors.length - 4} more files that could not be added.` : ''].filter(Boolean).join('\n');
      if (errors.length || saved < added) status.dataset.error = 'true';
    } catch { status.textContent = 'The photos could not be added. Please try again with a smaller image.'; status.dataset.error = 'true'; }
    finally {
      processing = false;
      $('#gallery-upload-fields').disabled = false;
      form.removeAttribute('aria-busy');
      if (saved) announceStorageChange();
      if (refreshPending) requestStorageRefresh();
    }
  });

  async function removePhoto(photo, button) {
    if (processing || removing) { $('#gallery-action-status').textContent = 'Wait for the current photo change to finish, then remove a photo.'; return; }
    removing = true;
    mutationVersion += 1;
    button.disabled = true;
    try {
      if (photo.saved) {
        if (!db) throw new Error('Saved photo storage is unavailable.');
        await storageTransaction('readwrite', store => store.delete(photo.id));
        announceStorageChange();
      }
      const index = uploads.findIndex(item => item.id === photo.id);
      uploads = uploads.filter(item => item.id !== photo.id);
      revokeURL(photo.src);
      renderGallery();
      $('#gallery-action-status').textContent = `Removed ${photo.caption} from this gallery. Your original file has not been changed.`;
      const nextRemove = $$('.gallery-remove-photo')[Math.min(index, uploads.length - 1)];
      (nextRemove || $('[data-gallery-filter="uploads"]')).focus({ preventScroll: true });
    } catch {
      button.disabled = false;
      $('#gallery-action-status').textContent = 'This saved photo could not be removed. Please refresh the page and try again.';
    }
    finally { removing = false; requestStorageRefresh(); }
  }

  function openLightbox(id, trigger) {
    lightboxItems = shownPhotos();
    lightboxIndex = lightboxItems.findIndex(photo => photo.id === id);
    if (lightboxIndex < 0) return;
    const hadOtherDialog = $$('dialog[open]').some(dialog => dialog !== lightbox);
    $$('dialog[open]').forEach(dialog => { if (dialog !== lightbox) dialog.close(); });
    lightboxTrigger = trigger;
    previousOverflow = hadOtherDialog ? '' : document.body.style.overflow;
    paintLightbox();
    if (!lightbox.open) lightbox.showModal();
    document.body.style.overflow = 'hidden';
    $('#gallery-lightbox-close').focus({ preventScroll: true });
  }
  function paintLightbox() {
    const photo = lightboxItems[lightboxIndex];
    if (!photo) return;
    const image = $('#gallery-lightbox-image');
    image.src = photo.src;
    image.alt = photo.alt;
    image.width = photo.width;
    image.height = photo.height;
    $('#gallery-lightbox-title').textContent = photo.caption;
    $('#gallery-lightbox-location').textContent = locations[photo.trip];
    $('#gallery-lightbox-counter').textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
    const credit = $('#gallery-lightbox-credit');
    credit.replaceChildren();
    if (photo.uploaded) credit.textContent = `Your trip photo · ${photo.saved ? 'Saved in this browser on this device' : 'This session only'}`;
    else credit.append(document.createTextNode('Photo by '), sourceLink(photo), element('br'), document.createTextNode('Destination inspiration'));
    $('#gallery-lightbox-prev').disabled = lightboxItems.length < 2;
    $('#gallery-lightbox-next').disabled = lightboxItems.length < 2;
  }
  function moveLightbox(direction) {
    if (lightboxItems.length < 2) return;
    lightboxIndex = (lightboxIndex + direction + lightboxItems.length) % lightboxItems.length;
    paintLightbox();
  }
  $('#gallery-lightbox-close').addEventListener('click', () => lightbox.close());
  $('#gallery-lightbox-prev').addEventListener('click', () => moveLightbox(-1));
  $('#gallery-lightbox-next').addEventListener('click', () => moveLightbox(1));
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); moveLightbox(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveLightbox(-1); }
  });
  lightbox.addEventListener('click', event => {
    const bounds = lightbox.getBoundingClientRect();
    if (event.target === lightbox && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    if (!$('dialog[open]')) {
      document.body.style.overflow = previousOverflow;
      if (lightboxTrigger?.isConnected && lightboxTrigger.getClientRects().length) lightboxTrigger.focus({ preventScroll: true });
      else $('#gallery-add-photos').focus({ preventScroll: true });
    }
    if (refreshPending) requestStorageRefresh();
  });
  window.addEventListener('pagehide', event => {
    if (!event.persisted) { objectURLs.forEach(url => URL.revokeObjectURL(url)); objectURLs.clear(); if (db) db.close(); syncChannel?.close(); }
  });
  renderGallery();
})();

/* Fictional layout samples and browser-local reviews. No review is sent to a server. */
(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const section = $('#reviews');
  const dialog = $('#review-dialog');
  const form = $('#review-form');
  if (!section || !dialog || !form) return;

  const LEGACY_STORAGE_KEY = 'trippy-trail:reviews:v1';
  const CHANGE_KEY = 'trippy-trail:reviews:changed:v2';
  const DATABASE = 'trippy-trail-reviews';
  const RECORD_STORE = 'reviews';
  const META_STORE = 'meta';
  const MIGRATION_KEY = 'legacy-v1-imported';
  const MAX_REVIEWS = 20;
  const trips = Object.freeze({ shangarh: 'Shangarh', jibhi: 'Jibhi & Shoja', kashmir: 'Kashmir' });
  const samples = Object.freeze([
    { id: 'sample-1', name: "Aarav Mehta", trip: 'shangarh', rating: 5, title: "A slower kind of weekend.", body: "Meadow walks, shared dinners and unhurried mornings. Exactly the reset we needed from city life.", sample: true, order: 0 },
    { id: 'sample-2', name: "Simran Kaur", trip: 'shangarh', rating: 4, title: "Cosy village, kind hosts.", body: "Loved the sunset point and the home-style food. A little more detail on the walk timings would have helped.", sample: true, order: 1 },
    { id: 'sample-3', name: "Rohan Verma", trip: 'shangarh', rating: 5, title: "Perfect for a group of friends.", body: "Easy pace, great views and plenty of time to just sit and talk. We are already planning the next one.", sample: true, order: 2 },
    { id: 'sample-4', name: "Ananya Sharma", trip: 'jibhi', rating: 4, title: "Forest air and a fresh perspective.", body: "A waterfall morning and a day on the trail made a great combination. A clearer packing list would help first-timers.", sample: true, order: 3 },
    { id: 'sample-5', name: "Karan Malhotra", trip: 'jibhi', rating: 5, title: "Jibhi stole our hearts.", body: "Mist in the mornings, quiet cafés and a lovely stay. Shoja felt like a different world.", sample: true, order: 4 },
    { id: 'sample-6', name: "Neha Thakur", trip: 'jibhi', rating: 5, title: "Worth every kilometre.", body: "Well-paced days with room to wander on our own. The group felt relaxed from the first evening.", sample: true, order: 5 },
    { id: 'sample-7', name: "Vikram Rathore", trip: 'jibhi', rating: 4, title: "Great trail, tiring drive.", body: "The trek was the highlight. The road in is long, so carry something for motion sickness.", sample: true, order: 6 },
    { id: 'sample-8', name: "Isha Kapoor", trip: 'kashmir', rating: 5, title: "Big views. Plenty to talk about.", body: "A good mix of lakeside exploring and slower valley days. Gadsar was unforgettable.", sample: true, order: 7 },
    { id: 'sample-9', name: "Arjun Singh", trip: 'kashmir', rating: 5, title: "Our best trip so far.", body: "Houseboat evenings, meadows and tea stops. Please confirm optional activity costs before departure, as we had to ask.", sample: true, order: 8 },
    { id: 'sample-10', name: "Meera Iyer", trip: 'kashmir', rating: 4, title: "Beautiful, but pack well.", body: "Stunning scenery and a thoughtful itinerary. Weather changes fast, so layers matter.", sample: true, order: 9 }
  ]);
  let ownReviews = [];
  let source = 'samples';
  let db = null;
  let storageAvailable = false;
  let storageChecked = false;
  let mutationPending = false;
  let formGeneration = 0;
  let formStatus = 'default';
  let storedReviews = [];
  const sessionReviews = new Map();
  let actionQueue = Promise.resolve();
  let refreshQueued = false;
  let channel = null;
  let opener = null;
  let removedReview = null;
  const feedback = $('#reviews-feedback');
  const formNote = $('#review-form-note');
  const undoButton = $('#review-undo');

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function validText(value, min, max) {
    return typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;
  }
  function cleanRecord(value) {
    if (!value || typeof value !== 'object' || typeof value.id !== 'string' ||
      !/^review-[a-z0-9-]{5,90}$/i.test(value.id) ||
      !validText(value.name, 2, 50) || typeof value.trip !== 'string' || !Object.hasOwn(trips, value.trip) ||
      !Number.isInteger(value.rating) || value.rating < 1 || value.rating > 5 ||
      !validText(value.title, 5, 80) || !validText(value.body, 20, 800) ||
      !Number.isSafeInteger(value.createdAt) || value.createdAt < 1 ||
      value.createdAt > Date.now() + 86400000) return null;
    return {
      id: value.id, name: value.name.trim(), trip: value.trip, rating: value.rating,
      title: value.title.trim(), body: value.body.trim(), createdAt: value.createdAt, saved: true
    };
  }
  function decodeStored(raw) {
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Invalid saved review collection.');
    const seen = new Set();
    return parsed.map(cleanRecord).filter(record => {
      if (!record || seen.has(record.id)) return false;
      seen.add(record.id);
      return true;
    }).slice(0, MAX_REVIEWS);
  }
  function storedRecord({ id, name, trip, rating, title, body, createdAt }) {
    return { id, name, trip, rating, title, body, createdAt };
  }
  function openDatabase() {
    return new Promise((resolve, reject) => {
      let settled = false;
      let request;
      const timer = window.setTimeout(() => finish(null, new Error('Review storage did not become available.')), 5000);
      function finish(database, error) {
        if (settled) { if (database) database.close(); return; }
        settled = true;
        window.clearTimeout(timer);
        if (error) reject(error); else resolve(database);
      }
      try { request = window.indexedDB.open(DATABASE, 1); }
      catch (error) { finish(null, error); return; }
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(RECORD_STORE)) database.createObjectStore(RECORD_STORE, { keyPath: 'id' });
        if (!database.objectStoreNames.contains(META_STORE)) database.createObjectStore(META_STORE, { keyPath: 'id' });
      };
      request.onsuccess = () => finish(request.result);
      request.onerror = () => finish(null, request.error || new Error('Review storage is unavailable.'));
      request.onblocked = () => finish(null, new Error('Review storage is busy in another tab.'));
    });
  }
  function storageTransaction(mode, stores, action) {
    return new Promise((resolve, reject) => {
      let transaction;
      let result;
      try {
        if (!db) throw new Error('Review storage is unavailable.');
        transaction = db.transaction(stores, mode);
        transaction.oncomplete = () => resolve(result);
        transaction.onerror = () => reject(transaction.error || new Error('Review storage failed.'));
        transaction.onabort = () => reject(transaction.error || new Error('Review storage was interrupted.'));
        action(transaction, value => { result = value; });
      } catch (error) {
        if (transaction) { try { transaction.abort(); } catch { /* It may already have finished. */ } }
        reject(error);
      }
    });
  }
  function migrateLegacy(records) {
    // The marker and imported records commit together. Another tab cannot import
    // an old array again after a review has been removed from the new store.
    return storageTransaction('readwrite', [RECORD_STORE, META_STORE], (transaction, done) => {
      const meta = transaction.objectStore(META_STORE);
      const marker = meta.get(MIGRATION_KEY);
      marker.onsuccess = () => {
        if (marker.result) { done(false); return; }
        const store = transaction.objectStore(RECORD_STORE);
        const existing = store.getAll();
        existing.onsuccess = () => {
          const ids = new Set(existing.result.map(record => record.id));
          let count = ids.size;
          records.forEach(record => {
            if (count >= MAX_REVIEWS || ids.has(record.id)) return;
            store.add(storedRecord(record));
            ids.add(record.id);
            count += 1;
          });
          meta.put({ id: MIGRATION_KEY, completedAt: Date.now() });
          done(true);
        };
      };
    });
  }
  function readRecords() {
    return storageTransaction('readonly', [RECORD_STORE], (transaction, done) => {
      const request = transaction.objectStore(RECORD_STORE).getAll();
      request.onsuccess = () => done(request.result.map(cleanRecord).filter(Boolean));
    });
  }
  function addRecord(review) {
    // A readwrite transaction serializes this count and insert with other tabs.
    // Never rewrite a whole collection from an in-memory snapshot.
    return storageTransaction('readwrite', [RECORD_STORE], (transaction, done) => {
      const store = transaction.objectStore(RECORD_STORE);
      const existing = store.get(review.id);
      existing.onsuccess = () => {
        if (existing.result) { done('exists'); return; }
        const count = store.count();
        count.onsuccess = () => {
          // Session-only entries still occupy this tab's visible collection.
          // Include them here as another tab may add after our preceding refresh.
          if (count.result + sessionReviews.size >= MAX_REVIEWS) { done('full'); return; }
          store.add(storedRecord(review));
          done('saved');
        };
      };
    });
  }
  function deleteRecord(id) {
    return storageTransaction('readwrite', [RECORD_STORE], (transaction, done) => {
      transaction.objectStore(RECORD_STORE).delete(id);
      done(true);
    });
  }
  function enqueue(action) {
    const task = actionQueue.then(action, action);
    actionQueue = task.catch(() => {});
    return task;
  }
  function mergeReviews() {
    const savedIds = new Set(storedReviews.map(review => review.id));
    ownReviews = [...storedReviews, ...Array.from(sessionReviews.values()).filter(review => !savedIds.has(review.id))]
      .sort((a, b) => b.createdAt - a.createdAt || a.id.localeCompare(b.id));
  }
  async function refreshReviews() {
    if (!db) return;
    const records = await readRecords();
    const before = JSON.stringify(ownReviews);
    storedReviews = records;
    mergeReviews();
    if (before !== JSON.stringify(ownReviews)) render();
  }
  function notifyChange() {
    try { channel?.postMessage('changed'); } catch { /* Activation refresh is also available. */ }
    try { localStorage.setItem(CHANGE_KEY, Date.now().toString(36) + '-' + Math.random().toString(36).slice(2)); }
    catch { /* IndexedDB may still work when localStorage is disabled. */ }
  }
  function requestRefresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    enqueue(async () => {
      // Clear at the start, so a change arriving during the read queues another read.
      refreshQueued = false;
      await storageReady;
      try { await refreshReviews(); }
      catch { storageAvailable = false; updateFormAvailability(); }
    });
  }
  try {
    channel = new BroadcastChannel('trippy-trail-reviews-v2');
    channel.addEventListener('message', event => { if (event.data === 'changed') requestRefresh(); });
  } catch { /* Storage events and activation refresh support older browsers. */ }
  window.addEventListener('storage', event => { if (event.key === CHANGE_KEY || event.key === null) requestRefresh(); });
  window.addEventListener('focus', requestRefresh);
  window.addEventListener('pageshow', event => { if (event.persisted) requestRefresh(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) requestRefresh(); });

  const storageReady = (async () => {
    let legacy = [];
    let legacyUnreadable = false;
    try { legacy = decodeStored(localStorage.getItem(LEGACY_STORAGE_KEY)); }
    catch { legacyUnreadable = true; }
    try {
      db = await openDatabase();
      db.onversionchange = () => {
        db.close();
        db = null;
        storageAvailable = false;
        updateFormAvailability();
      };
      // If the old key cannot be read, leave migration pending for a later visit.
      const migrated = legacyUnreadable ? false : await migrateLegacy(legacy);
      storedReviews = await readRecords();
      storageAvailable = true;
      if (migrated) notifyChange();
      if (legacyUnreadable) feedback.textContent = 'Earlier saved reviews could not be read. New reviews can still be saved in this browser.';
    } catch {
      if (db) { db.close(); db = null; }
      storageAvailable = false;
      feedback.textContent = 'Browser storage is unavailable. Saved reviews could not be loaded; new reviews stay in this tab for this visit.';
    }
    storageChecked = true;
    mergeReviews();
    render();
  })();

  function setFormNote(message, state = 'default') {
    formStatus = state;
    formNote.textContent = message;
  }
  function updateFormAvailability(showDefault = false) {
    const full = ownReviews.length >= MAX_REVIEWS;
    $('#review-submit').disabled = mutationPending || full;
    if (mutationPending) return;
    if (full) setFormNote('You have 20 reviews in this browser. Remove one from Your reviews before adding another.', 'capacity');
    else if (showDefault || formStatus === 'capacity' || formStatus === 'default' || formStatus === 'saving') {
      setFormNote(!storageChecked ? 'Checking browser storage. Your review will not be published or sent to the team.' : storageAvailable ? 'Your review stays in this browser. It is not published or sent to the team.' : 'Browser storage is unavailable. New reviews will stay in this tab for this visit.');
    }
  }
  async function saveReview(review) {
    // Keep unsaved entries separate: a refresh from another tab must not erase them.
    try { await refreshReviews(); } catch { storageAvailable = false; }
    if (ownReviews.some(item => item.id === review.id)) return 'exists';
    if (ownReviews.length >= MAX_REVIEWS) return 'full';
    if (db) {
      let result = null;
      try {
        result = await addRecord(review);
        storageAvailable = true;
      } catch { storageAvailable = false; }
      if (result === 'full' || result === 'exists') {
        try { await refreshReviews(); } catch { storageAvailable = false; }
        return result;
      }
      if (result === 'saved') {
        sessionReviews.delete(review.id);
        storedReviews = [...storedReviews.filter(item => item.id !== review.id), { ...review, saved: true }];
        mergeReviews();
        notifyChange();
        // A later read can fail without changing the fact that the insert committed.
        try { await refreshReviews(); } catch { storageAvailable = false; }
        return 'saved';
      }
    }
    sessionReviews.set(review.id, { ...review, saved: false });
    mergeReviews();
    return 'session';
  }

  function makeStars(rating, exact = false) {
    const row = element('span', 'review-stars');
    row.setAttribute('role', 'img');
    row.setAttribute('aria-label', rating === null ? 'No rating yet' : (exact ? rating.toFixed(1) : String(rating)) + ' out of 5 stars');
    for (let index = 0; index < 5; index += 1) {
      const star = element('span', 'review-star', '★');
      star.setAttribute('aria-hidden', 'true');
      const fill = rating === null ? 0 : Math.max(0, Math.min(100, (rating - index) * 100));
      star.style.setProperty('--star-fill', fill.toFixed(2) + '%');
      row.append(star);
    }
    return row;
  }
  function filteredReviews() {
    const destination = $('#reviews-destination').value;
    const sort = $('#reviews-sort').value;
    const items = (source === 'samples' ? samples : ownReviews).filter(review => destination === 'all' || review.trip === destination);
    return items.slice().sort((a, b) => {
      if (sort === 'highest' && a.rating !== b.rating) return b.rating - a.rating;
      if (sort === 'lowest' && a.rating !== b.rating) return a.rating - b.rating;
      if (source === 'samples') return a.order - b.order;
      return b.createdAt - a.createdAt || a.id.localeCompare(b.id);
    });
  }
  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map(part => Array.from(part)[0]).join('').toUpperCase();
  }
  function renderCard(review) {
    const card = element('article', 'review-card');
    card.dataset.reviewId = review.id;
    const top = element('div', 'review-card-top');
    const avatar = element('span', 'review-avatar', review.sample ? String(review.order + 1).padStart(2, '0') : initials(review.name));
    avatar.setAttribute('aria-hidden', 'true');
    const person = element('div', 'review-person');
    person.append(element('strong', '', review.name), element('span', 'review-trip', trips[review.trip]));
    top.append(avatar, person);
    const badge = element('span', 'review-badge', review.sample ? 'Sample review' : review.saved ? 'Saved on this device' : 'This session only');
    badge.dataset.kind = review.sample ? 'sample' : 'mine';
    const rating = element('div', 'review-card-rating');
    const ratingText = element('span', '', review.rating + ' / 5');
    ratingText.setAttribute('aria-hidden', 'true');
    rating.append(makeStars(review.rating), ratingText);
    const bottom = element('div', 'review-card-bottom');
    if (review.sample) bottom.append(element('span', 'review-card-date', 'Illustrative example'));
    else {
      const date = new Date(review.createdAt);
      const time = element('time', 'review-card-date', 'Added ' + new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(date));
      time.dateTime = date.toISOString();
      const actions = element('div', 'review-card-actions');
      const remove = element('button', 'review-remove', 'Remove');
      remove.type = 'button';
      remove.setAttribute('aria-label', 'Remove your review: ' + review.title);
      remove.addEventListener('click', () => removeReview(review));
      actions.append(remove);
      bottom.append(time, actions);
    }
    card.append(top, badge, rating, element('h3', 'review-card-title', review.title), element('p', 'review-card-body', review.body), bottom);
    return card;
  }
  /* Show only the first `limit` review cards; the rest scroll inside the list. */
  function capRows(container, limit = 6) {
    if (!container) return;
    container.style.maxHeight = '';
    container.classList.remove('is-capped');
    container.removeAttribute('tabindex');
    const cards = Array.from(container.children);
    if (container.hidden || cards.length <= limit) return;
    container.classList.add('is-capped');
    container.tabIndex = 0;
    const style = getComputedStyle(container);
    const gap = parseFloat(style.rowGap) || 0;
    const bottom = parseFloat(style.paddingBottom) || 0;
    container.style.maxHeight = Math.ceil(cards[limit].offsetTop - gap + bottom) + 'px';
  }
  window.TrippyCapRows = capRows;
  let capTimer;
  const recap = () => { capRows($('#review-cards')); capRows(document.getElementById('live-review-list')); };
  window.addEventListener('load', recap);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(recap);
  window.addEventListener('resize', () => {
    clearTimeout(capTimer);
    capTimer = setTimeout(recap, 120);
  });
  function render() {
    const focusedCard = document.activeElement?.closest?.('#review-cards [data-review-id]');
    const focusedReviewId = focusedCard?.dataset.reviewId;
    const items = filteredReviews();
    const average = items.length ? items.reduce((sum, review) => sum + review.rating, 0) / items.length : null;
    $('#review-cards').replaceChildren(...items.map(renderCard));
    $('#review-cards').hidden = items.length === 0;
    capRows($('#review-cards'));
    $('#reviews-empty').hidden = items.length > 0;
    $('#reviews-average').textContent = average === null ? '—' : average.toFixed(1);
    $('#reviews-stars').replaceChildren(makeStars(average, true));
    $('#reviews-summary-label').textContent = source === 'samples' ? 'Sample rating' : 'Your review rating';
    const reviewWord = items.length === 1 ? 'review' : 'reviews';
    $('#reviews-count').textContent = source === 'samples' ? items.length + ' illustrative ' + reviewWord : items.length + ' ' + reviewWord + ' in this browser';
    $$('button[data-review-source]').forEach(button => {
      const active = button.dataset.reviewSource === source;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('active', active);
    });
    section.dataset.reviewSource = source;
    const optionalCount = $('[data-review-mine-count]');
    if (optionalCount) optionalCount.textContent = String(ownReviews.length);
    updateFormAvailability();
    if (focusedReviewId) {
      const replacement = $$('#review-cards [data-review-id]').find(card => card.dataset.reviewId === focusedReviewId);
      (replacement?.querySelector('.review-remove') || $('[data-review-source="mine"]'))?.focus({ preventScroll: true });
    }
  }
  function selectMine() {
    source = 'mine';
    $('#reviews-destination').value = 'all';
    $('#reviews-sort').value = 'newest';
  }
  async function removeReview(review) {
    if (mutationPending) return;
    mutationPending = true;
    updateFormAvailability();
    try {
      await enqueue(async () => {
        await storageReady;
        if (review.saved) {
          await deleteRecord(review.id);
          storageAvailable = true;
          storedReviews = storedReviews.filter(item => item.id !== review.id);
          notifyChange();
        }
        sessionReviews.delete(review.id);
        mergeReviews();
        removedReview = { review: { ...review } };
        if (undoButton) undoButton.hidden = false;
        try { await refreshReviews(); } catch { storageAvailable = false; }
        render();
        feedback.textContent = review.saved ? 'Your saved review was removed from this browser. Use Undo to bring it back.' : 'Your session review was removed from this tab. Use Undo to bring it back.';
        (undoButton || $('[data-review-source="mine"]')).focus({ preventScroll: true });
      });
    } catch {
      storageAvailable = false;
      feedback.textContent = 'This saved review could not be removed. Please try again when browser storage is available.';
    } finally {
      mutationPending = false;
      updateFormAvailability();
    }
  }
  if (undoButton) undoButton.addEventListener('click', async () => {
    if (!removedReview || mutationPending) return;
    mutationPending = true;
    undoButton.disabled = true;
    updateFormAvailability();
    try {
      await enqueue(async () => {
        await storageReady;
        const result = await saveReview({ ...removedReview.review, saved: false });
        if (result === 'full') {
          feedback.textContent = 'This browser already has 20 reviews. Remove another review before restoring this one.';
          return;
        }
        removedReview = null;
        undoButton.hidden = true;
        selectMine();
        render();
        feedback.textContent = result === 'session' ? 'Review restored for this tab only. Browser storage is unavailable.' : result === 'exists' ? 'This review is already present in this browser.' : 'Review restored and saved in this browser on this device.';
        $('[data-review-source="mine"]').focus({ preventScroll: true });
      });
    } finally {
      mutationPending = false;
      undoButton.disabled = false;
      updateFormAvailability();
    }
  });

  $$('button[data-review-source]').forEach(button => button.addEventListener('click', () => {
    if (!['samples', 'mine'].includes(button.dataset.reviewSource)) return;
    source = button.dataset.reviewSource;
    render();
  }));
  $('#reviews-destination').addEventListener('change', render);
  $('#reviews-sort').addEventListener('change', render);
  function updateCharacters() { $('#review-char-count').textContent = $('#review-body').value.length + ' / 800'; }
  function clearValidity() {
    $$('input, select, textarea', form).forEach(field => field.setCustomValidity(''));
  }
  function openForm(trigger) {
    formGeneration += 1;
    opener = trigger || document.activeElement;
    $$('dialog[open]').forEach(other => { if (other !== dialog) other.close(); });
    form.reset();
    clearValidity();
    updateCharacters();
    const destination = $('#reviews-destination').value;
    if (Object.hasOwn(trips, destination)) $('#review-trip').value = destination;
    $('#review-rating-group').dataset.rating = '';
    if (mutationPending) setFormNote('Finishing the current review change…', 'saving');
    updateFormAvailability(true);
    requestRefresh();
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    dialog.scrollTop = 0;
    $('#review-dialog-title').focus({ preventScroll: true });
  }
  document.addEventListener('click', event => {
    const button = event.target.closest?.('[data-write-review]');
    if (button) { event.preventDefault(); openForm(button); }
  });
  $$('[data-review-close]', dialog).forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if ($('dialog[open]')) return;
    document.body.style.overflow = '';
    const parentDialog = opener?.closest?.('dialog');
    if (opener?.isConnected && opener.getClientRects().length && (!parentDialog || parentDialog.open)) opener.focus({ preventScroll: true });
    else ($$('[data-write-review]').find(button => button.getClientRects().length) || $('.menu-toggle'))?.focus({ preventScroll: true });
  });
  form.addEventListener('input', () => { clearValidity(); updateCharacters(); });
  form.addEventListener('change', () => {
    clearValidity();
    $('#review-rating-group').dataset.rating = $('input[name="review-rating"]:checked', form)?.value || '';
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (mutationPending) return;
    clearValidity();
    const name = $('#review-name').value.trim().replace(/\s+/g, ' ');
    const title = $('#review-title').value.trim();
    const body = $('#review-body').value.trim();
    const trip = $('#review-trip').value;
    const rating = Number($('input[name="review-rating"]:checked', form)?.value);
    if (!validText(name, 2, 50)) $('#review-name').setCustomValidity('Enter a display name of 2–50 characters.');
    if (!validText(title, 5, 80)) $('#review-title').setCustomValidity('Write a title of 5–80 characters.');
    if (!validText(body, 20, 800)) $('#review-body').setCustomValidity('Write a review of 20–800 characters.');
    if (!Object.hasOwn(trips, trip)) $('#review-trip').setCustomValidity('Choose a trip.');
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) $('input[name="review-rating"]', form).setCustomValidity('Choose a rating from 1 to 5 stars.');
    if (!form.reportValidity()) {
      setFormNote('Please complete the highlighted fields before saving your review.', 'validation');
      return;
    }
    const id = 'review-' + (window.crypto?.randomUUID ? window.crypto.randomUUID() : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2));
    const review = { id, name, trip, rating, title, body, createdAt: Date.now(), saved: false };
    const generation = formGeneration;
    mutationPending = true;
    form.setAttribute('aria-busy', 'true');
    setFormNote('Saving your review in this browser…', 'saving');
    updateFormAvailability();
    try {
      await enqueue(async () => {
        await storageReady;
        const result = await saveReview(review);
        if (result === 'full') {
          setFormNote('You have 20 reviews in this browser. Remove one before adding another.', 'capacity');
          return;
        }
        selectMine();
        render();
        feedback.textContent = result === 'session' ? 'Review added for this tab only. Browser storage is unavailable; it has not been published.' : 'Review saved in this browser on this device. It has not been published or sent to the team.';
        if (dialog.open && generation === formGeneration) dialog.close();
      });
    } catch {
      setFormNote('The review could not be added. Please try again.', 'validation');
    } finally {
      mutationPending = false;
      form.removeAttribute('aria-busy');
      updateFormAvailability();
    }
  });
  render();
  updateCharacters();
})();

(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  const root = document.documentElement;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let motionEnabled = !motionPreference.matches;

  // Decorative motion follows the device preference automatically.
  function setMotion(enabled) {
    motionEnabled = enabled;
    root.dataset.motion = enabled ? 'on' : 'off';
    if (!enabled) {
      $$('.trip-image-button').forEach(el => {
        el.style.removeProperty('--tilt-x');
        el.style.removeProperty('--tilt-y');
      });
      $('.hero-art').style.removeProperty('--hero-shift');
    }
  }
  setMotion(motionEnabled);
  motionPreference.addEventListener('change', event => setMotion(!event.matches));

  const scenes = {
    shangarh: { name: 'Shangarh', region: 'HIMACHAL PRADESH', mood: 'Slow days. Wide-open meadows.', number: '01', image: 'assets/img/shangarh-green-meadows.webp', alt: 'Green Shangarh meadows beneath forested mountains' },
    jibhi: { name: 'Jibhi & Shoja', region: 'HIMACHAL PRADESH', mood: 'Forest roads. Fresh perspectives.', number: '02', image: 'assets/img/jibhi-mist-hills-hero.webp', alt: 'Mist over forested hills and snowy ridges in Jibhi, Himachal Pradesh' },
    kashmir: { name: 'Kashmir', region: 'KASHMIR', mood: 'Big views. A different perspective.', number: '03', image: 'assets/img/kashmir-gadsar-lake.webp', alt: 'Turquoise Gadsar Lake beneath rocky peaks in Kashmir' }
  };
  let currentScene = 'jibhi';
  const sceneAnnouncement = document.createElement('p');
  sceneAnnouncement.className = 'sr-only';
  sceneAnnouncement.setAttribute('aria-live', 'polite');
  $('.scene-picker').after(sceneAnnouncement);
  function setScene(key, announce = true) {
    if (!Object.hasOwn(scenes, key)) return;
    currentScene = key;
    const scene = scenes[key];
    const image = $('.hero-art>img');
    // A locally selected original stays in place while the visitor explores destinations.
    if (!image.getAttribute('src').startsWith('blob:')) {
      image.src = scene.image;
      image.alt = scene.alt;
      if (motionEnabled && typeof image.animate === 'function') image.animate([{ opacity: .45 }, { opacity: 1 }], { duration: 420, easing: 'ease-out' });
    }
    $('#hero-scene-name').textContent = scene.name;
    $('#hero-scene-region').textContent = scene.region;
    $('#hero-scene-mood').textContent = scene.mood;
    $('#hero-scene-number').textContent = `${scene.number} / 03`;
    $('#hero-route-button').dataset.trip = key;
    $('#hero-route-button').setAttribute('aria-label', `Explore the featured ${scene.name} sample journey`);
    $$('[data-hero-scene]').forEach(button => {
      const active = button.dataset.heroScene === key;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (announce) sceneAnnouncement.textContent = `${scene.name} preview selected. Explore its sample journey with the arrow button.`;
  }
  $$('[data-hero-scene]').forEach(button => button.addEventListener('click', () => setScene(button.dataset.heroScene)));
  document.addEventListener('trippy:photos-reset', () => setScene(currentScene, false));

  const revealElements = $$('.section-heading, .trip-card, .custom-trail, .feeling-statement, .feeling-details, .journal-tile, .journal-quote, .collaboration-section, .plan-banner');
  revealElements.forEach(el => el.setAttribute('data-reveal', ''));
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -25px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        $$('.desktop-nav a, .mobile-nav a').forEach(link => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    $$('#trails, #trip-details, #gallery, #reviews, #collaborate, #faq').forEach(section => sectionObserver.observe(section));
    document.body.classList.add('js-enhanced');
  } else revealElements.forEach(el => el.classList.add('is-visible'));
  document.addEventListener('trippy:filter', () => {
    $$('.trip-card:not([hidden])').forEach(card => card.classList.add('is-visible'));
  });

  let scrollFrame = 0;
  function paintScroll() {
    scrollFrame = 0;
    const distance = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, window.scrollY / distance));
    $('#reading-progress').style.transform = `scaleX(${progress})`;
    $('.site-header').classList.toggle('is-scrolled', window.scrollY > 30);
    if (motionEnabled && finePointer.matches && window.scrollY < 850) $('.hero-art').style.setProperty('--hero-shift', `${Math.min(16, window.scrollY * .025)}px`);
    if (window.scrollY < 100) $$('.desktop-nav a, .mobile-nav a').forEach(link => link.removeAttribute('aria-current'));
  }
  window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(paintScroll); }, { passive: true });
  window.addEventListener('resize', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(paintScroll); }, { passive: true });
  paintScroll();

  $$('.trip-image-button').forEach(card => {
    let pointerFrame = 0;
    card.addEventListener('pointermove', event => {
      if (!motionEnabled || !finePointer.matches || event.pointerType === 'touch') return;
      const { clientX, clientY } = event;
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = Math.max(-.5, Math.min(.5, (clientX - rect.left) / rect.width - .5));
        const y = Math.max(-.5, Math.min(.5, (clientY - rect.top) / rect.height - .5));
        card.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
        pointerFrame = 0;
      });
    });
    card.addEventListener('pointerleave', () => {
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  });
})();

(() => {
  'use strict';
  const stage = document.getElementById('scenic-trail');
  if (!stage) return;
  const route = stage.querySelector('[data-walk-route]');
  const walker = stage.querySelector('[data-walker]');
  if (!route || !walker) return;

  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const body = stage.querySelector('[data-walk-body]');
  const legs = ['far', 'near'].map(side => ({
    leg: stage.querySelector(`[data-walk-leg="${side}"]`),
    boot: stage.querySelector(`[data-walk-boot="${side}"]`),
    arm: stage.querySelector(`[data-walk-arm="${side}"]`)
  }));
  const clouds = Array.from(stage.querySelectorAll('[data-walk-cloud]'));
  const birds = Array.from(stage.querySelectorAll('[data-flight-bird]')).map((bird, index) => ({
    bird,
    left: bird.querySelector('[data-bird-wing="left"]'),
    right: bird.querySelector('[data-bird-wing="right"]'),
    x: index ? 400 : 382,
    y: index ? 40 : 49,
    scale: index ? .8 : 1,
    period: index ? 4.1 : 4.6,
    flapPeriod: index ? .72 : .65,
    burst: index ? 2.1 : 2.4,
    offset: index ? 1.1 : 0
  }));
  const duration = 18;
  const stride = 16;
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => { const p = clamp(value); return p * p * (3 - 2 * p); };
  const fixed = value => value.toFixed(2);
  let length;
  try { length = route.getTotalLength(); } catch { return; }
  if (!Number.isFinite(length) || length < 1) return;
  const cycle = 2 * stride / (length / duration);
  let elapsed = duration * .35;
  let frame = 0;
  let previous = 0;
  let inView = !('IntersectionObserver' in window);

  function state() {
    if (reduced.matches) return 'reduced';
    if (root.dataset.motion === 'off') return 'paused';
    if (document.hidden) return 'hidden';
    if (!inView) return 'offscreen';
    return 'playing';
  }

  const pointAt = distance => route.getPointAtLength(Math.max(0, Math.min(length, distance)));

  function paintBirds(time, still = false) {
    const drift = still ? 0 : Math.sin(time * .28) * 3.5;
    birds.forEach((flight, index) => {
      const phase = (time + flight.offset) % flight.period;
      // A few wingbeats ease into a wings-out glide; the pair has different rhythms.
      const envelope = ease(phase / .18) * ease((flight.burst - phase) / .22);
      const flap = still ? 0 : Math.sin(phase / flight.flapPeriod * Math.PI * 2) * envelope;
      const tipY = -1.1 + flap * 5;
      const span = 9 - Math.abs(flap) * .7;
      const bendY = tipY * .55 - 1.6;
      flight.left?.setAttribute('d', `M0 0Q${fixed(-span * .5)} ${fixed(bendY)} ${fixed(-span)} ${fixed(tipY)}`);
      flight.right?.setAttribute('d', `M0 0Q${fixed(span * .5)} ${fixed(bendY)} ${fixed(span)} ${fixed(tipY)}`);
      const bob = still ? 0 : Math.sin(time * 1.3 + index * 1.4) * .7 - flap * .2;
      const bank = still ? 0 : Math.sin(time * .6 + index) * 2;
      flight.bird.setAttribute('transform', `translate(${fixed(flight.x + drift)} ${fixed(flight.y + bob)}) rotate(${fixed(bank)}) scale(${flight.scale})`);
    });
  }

  function paint(time) {
    const progress = (time % duration) / duration;
    const distance = progress * length;
    const position = pointAt(distance);
    const gait = (time / cycle) % 1;
    const bob = Math.cos(gait * Math.PI * 4) * .65;
    walker.setAttribute('transform', `translate(${fixed(position.x)} ${fixed(position.y)})`);
    walker.setAttribute('opacity', fixed(ease(progress / .045) * ease((1 - progress) / .045)));
    body?.setAttribute('transform', `translate(0 ${fixed(bob)})`);

    legs.forEach((limb, index) => {
      const phase = (gait + index * .5) % 1;
      const swinging = phase >= .5;
      const recovery = (phase - .5) * 2;
      // During stance, the foot moves back at the body's forward speed.
      // During recovery it lifts, then plants on the actual terrain curve.
      const offset = swinging ? stride * (ease(recovery) - .5) : stride * (.5 - 2 * phase);
      const ground = pointAt(distance + offset);
      const footX = ground.x - position.x;
      const footY = ground.y - position.y - (swinging ? Math.sin(recovery * Math.PI) * 4 : 0);
      const hipY = -17 + bob;
      const dx = footX;
      const dy = footY - hipY;
      const reach = Math.max(.1, Math.hypot(dx, dy));
      const bend = Math.sqrt(Math.max(0, 10.8 * 10.8 - reach * reach / 4));
      const kneeX = dx / 2 + dy / reach * bend;
      const kneeY = hipY + dy / 2 - dx / reach * bend;
      limb.leg?.setAttribute('d', `M0 ${fixed(hipY)}L${fixed(kneeX)} ${fixed(kneeY)}L${fixed(footX)} ${fixed(footY)}`);
      const ahead = pointAt(distance + offset + 1);
      const behind = pointAt(distance + offset - 1);
      const slope = Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180 / Math.PI;
      limb.boot?.setAttribute('transform', `translate(${fixed(footX)} ${fixed(footY)}) rotate(${fixed(slope)})`);
      const handX = -Math.cos(phase * Math.PI * 2) * 5.5;
      limb.arm?.setAttribute('d', `M0 -31Q${fixed(handX * .6 - 1)} -24 ${fixed(handX)} ${fixed(-18 - Math.abs(handX) * .15)}`);
    });

    clouds.forEach((cloud, index) => {
      const drift = Math.sin(time / (index ? 13 : 18) + index) * (index ? 8 : 12);
      cloud.setAttribute('transform', `translate(${fixed(drift)} 0)`);
    });
    paintBirds(time, reduced.matches || root.dataset.motion === 'off');
  }

  function tick(now) {
    frame = 0;
    if (state() !== 'playing') { previous = 0; return; }
    const delta = previous ? Math.min((now - previous) / 1000, .064) : 0;
    previous = now;
    elapsed += delta;
    paint(elapsed);
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    const next = state();
    stage.dataset.animationState = next;
    if (next === 'playing') {
      if (!frame) { previous = 0; frame = requestAnimationFrame(tick); }
    } else {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      if (next === 'reduced' || next === 'paused') paintBirds(elapsed, true);
    }
  }

  // The first pose is already partway along the trail, including with motion off.
  paint(elapsed);
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
  });
  window.addEventListener('pageshow', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      sync();
    }, { threshold: 0 }).observe(stage);
  }
  sync();
})();

/* Visitor-controlled appearance. No account or server settings are changed. */
(() => {
  'use strict';
  const root = document.documentElement;
  const dialog = document.querySelector('#theme-dialog');
  if (!dialog) return;
  const key = 'trippy-trail:theme:v1';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const choices = Array.from(dialog.querySelectorAll('input[name="site-theme"]'));
  const triggers = Array.from(document.querySelectorAll('[data-theme-open]'));
  const labels = { light: 'Light', dark: 'Dark', system: 'System' };
  let preference = root.dataset.themePreference || 'system';
  let opener = null;

  function apply(value, save = false, announce = false) {
    preference = Object.hasOwn(labels, value) ? value : 'system';
    const theme = preference === 'system' ? (system.matches ? 'dark' : 'light') : preference;
    root.dataset.theme = theme;
    root.dataset.themePreference = preference;
    root.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0c1717' : '#f7f7f0');
    choices.forEach(input => { input.checked = input.value === preference; });
    triggers.forEach(trigger => {
      trigger.setAttribute('aria-label', `Choose theme, current: ${labels[preference]}${preference === 'system' ? ` (${theme})` : ''}`);
      trigger.setAttribute('title', `Theme: ${labels[preference]}`);
    });
    document.querySelector('#theme-current').textContent = preference === 'system' ? `Following your device · ${labels[theme]}` : `${labels[theme]} theme selected`;
    if (save) {
      try {
        localStorage.setItem(key, preference);
        document.querySelector('#theme-save-note').textContent = 'Your choice is saved on this browser.';
      } catch {
        document.querySelector('#theme-save-note').textContent = 'Your choice is applied for this visit. This browser could not save it.';
      }
    }
    if (announce) document.querySelector('#theme-status').textContent = `${labels[theme]} theme applied${preference === 'system' ? ', following your device' : ''}.`;
  }

  apply(preference);
  try {
    if (localStorage.getItem(key) === preference) {
      document.querySelector('#theme-save-note').textContent = 'Your choice is saved on this browser.';
    }
  } catch { /* The picker still works when browser storage is unavailable. */ }
  choices.forEach(input => input.addEventListener('change', () => {
    if (input.checked) apply(input.value, true, true);
  }));
  system.addEventListener('change', () => {
    if (preference === 'system') apply('system', false, dialog.open);
  });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      apply(event.newValue || 'light', false, dialog.open);
    }
  });
  triggers.forEach(trigger => trigger.addEventListener('click', () => {
    opener = trigger;
    dialog.showModal();
    triggers.forEach(item => item.setAttribute('aria-expanded', 'true'));
    dialog.querySelector('input:checked')?.focus({ preventScroll: true });
  }));
  dialog.querySelectorAll('[data-theme-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    triggers.forEach(item => item.setAttribute('aria-expanded', 'false'));
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  });
})();

/* Turn a short daydream into a destination-specific gallery view. */
(() => {
  'use strict';
  const section = document.querySelector('#next-memory');
  if (!section) return;
  const moments = {
    shangarh: { title: 'Shangarh', caption: 'Swap the rush for a meadow walk and a slower kind of morning.' },
    jibhi: { title: 'Jibhi & Shoja', caption: 'Trade the usual route for forest air, village lanes and a little curiosity.' },
    kashmir: { title: 'Kashmir', caption: 'Leave the everyday behind. Make room for mountain views and a different rhythm.' }
  };
  const cards = Array.from(section.querySelectorAll('[data-memory]'));
  let selected = 'shangarh';
  function selectMoment(key, announce = false) {
    if (!Object.hasOwn(moments, key)) return;
    selected = key;
    cards.forEach(card => {
      const active = card.dataset.memory === key;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-pressed', String(active));
      if (active) card.setAttribute('aria-describedby', 'memory-description');
      else card.removeAttribute('aria-describedby');
    });
    section.querySelector('#memory-description').textContent = moments[key].caption;
    section.querySelector('#memory-gallery-label').textContent = `See ${moments[key].title} moments`;
    section.querySelector('#memory-photo-note').textContent = key === 'kashmir'
      ? 'Gadsar Lake is shown for inspiration; it is not on the sample route.'
      : 'Destination inspiration · Photo credits in the gallery.';
    if (announce) section.querySelector('#memory-selection-status').textContent = `${moments[key].title} selected. ${moments[key].caption}`;
  }
  cards.forEach(card => card.addEventListener('click', () => selectMoment(card.dataset.memory, true)));
  // Keep the initial story in step with whichever itinerary the visitor just viewed.
  document.addEventListener('trippy:trip-details', event => selectMoment(event.detail?.key));
  selectMoment(document.querySelector('[data-trip-select][aria-selected="true"]')?.dataset.tripSelect || selected);
  section.querySelector('#memory-gallery-link').addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const gallery = document.querySelector('#gallery');
    const filter = gallery?.querySelector(`[data-gallery-filter="${selected}"]`);
    if (!gallery || !filter) return;
    event.preventDefault();
    filter.click();
    const reduced = document.documentElement.dataset.motion === 'off' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gallery.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    filter.focus({ preventScroll: true });
  });
})();

/* Small CSS meteor trails at night; event-driven daylight, with no render loop. */
(() => {
  'use strict';
  const root = document.documentElement;
  const layer = document.querySelector('#sky-layer');
  const sun = document.querySelector('#sky-sun');
  if (!layer || !sun) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const dialogs = Array.from(document.querySelectorAll('dialog'));
  let frame = 0;
  let needsMeasure = true;
  let pageHidden = false;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let distance = 1;
  let lastProgress = -1;
  const clamp = value => Math.max(0, Math.min(1, value));

  function state() {
    if (document.hidden || pageHidden) return 'hidden';
    if (dialogs.some(dialog => dialog.open)) return 'dialog';
    if (reduced.matches) return 'reduced';
    if (root.dataset.motion === 'off') return 'paused';
    return 'playing';
  }
  function paintDay(force = false) {
    if (needsMeasure) {
      width = window.innerWidth;
      height = window.innerHeight;
      distance = Math.max(1, document.documentElement.scrollHeight - height);
      needsMeasure = false;
      force = true;
    }
    const progress = clamp(window.scrollY / distance);
    if (!force && Math.abs(progress - lastProgress) < .00035) return;
    lastProgress = progress;
    // The sun crosses the sky, then descends to a slightly lower evening horizon.
    const x = width * (.04 + .92 * progress);
    const y = height * (.77 + .09 * progress - .64 * Math.sin(Math.PI * progress));
    const dawn = clamp(1 - progress / .42);
    const dusk = clamp((progress - .5) / .5);
    const noon = Math.max(0, 1 - dawn - dusk);
    sun.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)`;
    layer.style.setProperty('--sky-dawn', dawn.toFixed(3));
    layer.style.setProperty('--sky-noon', noon.toFixed(3));
    layer.style.setProperty('--sky-dusk', dusk.toFixed(3));
    layer.dataset.skyProgress = progress.toFixed(4);
    layer.dataset.skyPhase = progress < .28 ? 'sunrise' : progress > .72 ? 'sunset' : 'daylight';
  }
  function cancelFrame() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  }
  function queueDay() {
    if (root.dataset.theme === 'dark' || state() !== 'playing' || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (root.dataset.theme !== 'dark' && state() === 'playing') paintDay();
    });
  }
  function sync() {
    const next = state();
    layer.dataset.skyState = next;
    if (next !== 'playing' || root.dataset.theme === 'dark') cancelFrame();
    else { needsMeasure = true; queueDay(); }
  }
  function resize() { needsMeasure = true; queueDay(); }

  // A stable initial scene remains available with motion disabled.
  paintDay(true);
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-motion'] });
  const modalObserver = new MutationObserver(sync);
  dialogs.forEach(dialog => modalObserver.observe(dialog, { attributes: true, attributeFilter: ['open'] }));
  window.addEventListener('scroll', queueDay, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(document.body);
  else {
    document.addEventListener('trippy:trip-details', resize);
    document.addEventListener('toggle', resize, true);
    window.addEventListener('load', resize, { once: true });
  }
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => { pageHidden = true; sync(); });
  window.addEventListener('pageshow', () => { pageHidden = false; needsMeasure = true; sync(); });
  sync();
})();
;
(() => {
  const dialog = document.querySelector('#policy-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const policies = {
    cancellation: { name: 'Cancellation and refunds', status: 'Pending owner approval',
      lead: 'Trippy Trail has not approved cancellation or refund terms yet. Nothing can be booked or paid on this demo, so nothing can be cancelled or refunded here.',
      topics: ['Who can cancel, and until when', 'How refunds are calculated', 'Refund timeline and method', 'What happens if Trippy Trail changes or cancels a departure', 'Weather and road-closure changes', 'Costs that cannot be refunded, if any'] },
    rescheduling: { name: 'Rescheduling', status: 'Pending owner approval',
      lead: 'Rules for changing a booking have not been approved yet. They will be published before real bookings open.',
      topics: ['Changing dates or the number of travellers', 'Deadlines and any change fees', 'Moving to another departure', 'Passing a booking to another person'] },
    payments: { name: 'Prices, taxes and payments', status: 'Pending owner approval',
      lead: 'Prices on this site are samples. Estimates exclude taxes and extras, which still need to be confirmed by the team.',
      topics: ['Whether prices include GST and other taxes', 'Deposit and balance due dates', 'Accepted payment methods', 'Optional costs paid during the trip', 'Invoice details'] },
    terms: { name: 'Booking terms', status: 'Pending owner approval',
      lead: 'Booking terms have not been approved yet. A sample estimate is not a confirmed booking.',
      topics: ['What a booking confirmation means', 'Group size and departure conditions', 'Stay, meals and transport as agreed', 'Safety, conduct and fitness expectations', 'Weather, permissions and local rules, including bonfires', 'Support contact during a trip'] },
    privacy: { name: 'Privacy', status: 'Summary',
      lead: 'We only ask for what we need to plan your trip: your name, how to reach you, travel dates and group size. Saved trips, reviews and photos you add on this site stay in your own browser. We never sell your details.',
      topics: ['What we collect: name, phone, email, dates, group size and notes you choose to send', 'Why: to answer you, plan and confirm your trip, and handle payments', 'Payments are handled by the payment provider; we never see or store card details', 'Shared only with the stays, drivers and partners needed to run your trip', 'You can ask us to correct or delete your details at any time', 'Questions: Trippytrail.in@gmail.com or +91 89209 33972'] }
  };
  const $ = selector => dialog.querySelector(selector);
  const switcher = $('.policy-switch');
  Object.entries(policies).forEach(([key, policy]) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'policy-chip'; button.dataset.policy = key; button.textContent = policy.name;
    switcher.append(button);
  });
  let opener = null;
  function render(key) {
    const policy = policies[key];
    $('#policy-title').textContent = policy.name;
    $('#policy-status').textContent = policy.status;
    $('#policy-lead').textContent = policy.lead;
    const full = $('#policy-full');
    $('#policy-topics-title').textContent = key === 'privacy' ? 'At a glance' : 'This policy will cover';
    if (full) full.hidden = key !== 'privacy' || !full.dataset.live;
    $('#policy-note').textContent = key === 'privacy'
      ? 'This is a short summary. The full privacy policy has all the details.'
      : 'Placeholder only. The owner’s approved wording will replace this page. No terms are being offered yet.';
    const list = $('#policy-topics');
    list.replaceChildren(...policy.topics.map(topic => { const li = document.createElement('li'); li.textContent = topic; return li; }));
    switcher.querySelectorAll('button').forEach(button => { if (button.dataset.policy === key) button.setAttribute('aria-current', 'true'); else button.removeAttribute('aria-current'); });
  }
  function open(key, trigger) {
    if (!Object.hasOwn(policies, key)) return;
    render(key);
    if (!dialog.open) {
      opener = trigger || document.activeElement;
      document.querySelectorAll('dialog[open]').forEach(other => other.close());
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
    $('#policy-title').focus({ preventScroll: true });
    dialog.scrollTop = 0;
  }
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-policy]');
    if (!trigger) return;
    event.preventDefault();
    open(trigger.dataset.policy, trigger);
  });
  $('[data-policy-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    opener = null;
  });
})();
;
(() => {
  const clean = v => String(v || '').trim();
  function cfg() {
    const c = window.TRIPPY_CONTACT || {};
    const wa = clean(c.whatsapp), ph = clean(c.phone);
    const em = clean(c.email); return { whatsapp: /^\d{10,15}$/.test(wa) ? wa : '', phone: /^\+?\d{10,15}$/.test(ph) ? ph : '', email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em) ? em : '' };
  }
  const text = sel => (document.querySelector(sel)?.textContent || '').trim();
  function message(el) {
    const src = el.dataset.source;
    if (src === 'enquiry') {
      const v = (document.getElementById('enquiry-message')?.value || '').trim();
      if (v) return v;
    }
    if (src === 'booking') {
      const parts = [text('#receipt-trip'), text('#receipt-date') && 'arrival ' + text('#receipt-date'), text('#receipt-people')].filter(Boolean);
      return 'Hi Trippy Trail! I was looking at a sample estimate' + (parts.length ? ' (' + parts.join(', ') + ')' : '') + ' and would like to talk about it.';
    }
    if (src === 'trip' && el.dataset.tripTitle) return 'Hi Trippy Trail! I would like to know more about the ' + el.dataset.tripTitle + ' trip.';
    return 'Hi Trippy Trail! I would like to know more about your trips.';
  }
  function apply(root = document) {
    const c = cfg();
    root.querySelectorAll('[data-contact]').forEach(el => {
      const kind = el.dataset.contact;
      const ok = kind === 'whatsapp' ? !!c.whatsapp : kind === 'email' ? !!c.email : !!c.phone;
      el.hidden = !ok;
      if (ok) el.href = kind === 'whatsapp' ? 'https://wa.me/' + c.whatsapp : kind === 'email' ? 'mailto:' + c.email : 'tel:' + c.phone.replace(/^\+?/, '+');
    });
    root.querySelectorAll('[data-contact-row]').forEach(row => { row.hidden = !row.querySelector('[data-contact]:not([hidden])'); });
    const nice = v => '+91 ' + String(v).replace(/^\+?91/, '').replace(/(\d{5})(\d{5})/, '$1 $2');
    root.querySelectorAll('[data-contact-label]').forEach(el => { el.textContent = el.dataset.contactLabel === 'email' ? c.email : nice(c.phone || c.whatsapp); });
    const f = document.getElementById('footer-support');
    if (f) {
      f.textContent = '';
      const add = (href, label, ext) => { const a = document.createElement('a'); a.href = href; a.textContent = label; if (ext) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } f.appendChild(a); };
      if (c.phone) add('tel:+' + c.phone.replace(/^\+/, ''), '+91 ' + c.phone.replace(/^\+?91/, '').replace(/(\d{5})(\d{5})/, '$1 $2'));
      if (c.whatsapp) add('https://wa.me/' + c.whatsapp, 'WhatsApp', true);
      if (c.email) add('mailto:' + c.email, c.email);
      f.classList.toggle('tbd', !(c.phone || c.whatsapp || c.email));
      if (!f.childNodes.length) f.textContent = 'To be added';
    }
  }
  document.addEventListener('click', event => {
    const el = event.target.closest('a[data-contact="whatsapp"]');
    if (!el) return;
    const c = cfg();
    if (!c.whatsapp) { event.preventDefault(); return; }
    el.href = 'https://wa.me/' + c.whatsapp + '?text=' + encodeURIComponent(message(el));
  }, true);
  const panel = document.getElementById('trip-detail-panel');
  if (panel) new MutationObserver(() => apply(panel)).observe(panel, { childList: true, subtree: true });
  window.TrippyContact = { refresh: () => apply(document) };
  apply();
})();
;
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bar = document.createElement('div');
  bar.className = 'scroll-progress'; bar.setAttribute('aria-hidden', 'true');
  document.body.append(bar);
  let queued = false;
  const update = () => { queued = false; const max = document.documentElement.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')'; };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update, { passive: true });
  update();
  if (!reduce && matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.trip-card').forEach(card => card.addEventListener('pointermove', event => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (event.clientX - r.left) + 'px');
      card.style.setProperty('--my', (event.clientY - r.top) + 'px');
    }));
  }
})();
;
(() => {
  const el = document.querySelector('.collaboration-visual');
  if (!el) return;
  const load = () => el.style.setProperty('--collab-img', "url('" + new URL('assets/img/jibhi-mountain-views.webp', document.baseURI).href + "')");
  if (!('IntersectionObserver' in window)) { load(); return; }
  const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { load(); observer.disconnect(); } }, { rootMargin: '600px 0px' });
  observer.observe(el);
})();
