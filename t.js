var wiki = require('wiki-page');


query_wiki("akbar")

function query_wiki(title) {

  res = {}
  related = {}
  wiki.fetch({
    section: 'page',
    type: 'summary',
    // type: 'related', //links
    title: title,
  }, (data) => {
    // console.log(Object.keys(data))
    // console.log(data.description)
    // console.log(data.extract)
    res.description = data.description
    res.extract = data.extract

    // console.log(data)
    related[data.displaytitle] = pack(data,-1)


    wiki.fetch({
      section: 'page',
      type: 'related', //links
      title: title,
    }, (data) => {
      // console.log(Object.keys(data))
      // console.log(data.pages[0])
      for (i in data.pages) {
        elm = data.pages[i]
        temp_obj = pack(elm,i)
        // console.log(temp_obj);
        title = temp_obj.title
        related[title] = temp_obj
        // console.log(data.pages[e].displaytitle)
      }
      // console.log(related)

      res.related = related

      // console.log(res)

      return res
    });

  });


}


function pack(data, count) {
  temp_obj = {}
  elm = data

  temp_obj.title = check_key(elm, "displaytitle") ? elm.displaytitle : undefined
  temp_obj.description = check_key(elm, "description") ? elm.description : undefined
  temp_obj.extract = check_key(elm, "extract") ? elm.extract : undefined
  temp_obj.link = check_key(elm, "content_urls") ? elm.content_urls.desktop.page : undefined
  temp_obj.image = check_key(elm, "thumbnail") ? elm.thumbnail.source : undefined
  temp_obj.count = count

  return temp_obj
}

function check_key(data, key) {
  if (data.hasOwnProperty(key)) {
    return true
  } else {
    return false
  }
}













// wiki.fetch({
//   section: 'page',
//   // type: 'summary',
//   type: 'related', //links
//   // type: 'lint', //links 
//   title: 'batman',
// }, (data) => {
//   // console.log(data);

//   // console.log(data)
//   console.log(Object.keys(data))
//   // console.log(Object.keys(data.pages))

//   for (e in data.pages) {
//     console.log(data.pages[e].displaytitle)
//   }
// });

// data = {
//   pages: [{
//       pageid: 12024,
//       ns: 0,
//       index: 9,
//       type: 'standard',
//       title: 'General_relativity',
//       displaytitle: 'General relativity',
//       namespace: [Object],
//       wikibase_item: 'Q11452',
//       titles: [Object],
//       thumbnail: [Object],
//       originalimage: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '943049850',
//       tid: '80aec5a0-5c09-11ea-9c03-c11164e69a73',
//       timestamp: '2020-02-28T14:38:37Z',
//       description: 'Einstein\'s theory of gravitation as curved spacetime',
//       description_source: 'local',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'General relativity (GR), also known as the general theory of relativity (GTR), is the geometric theory of gravitation published by Albert Einstein in 1915 and the current description of gravitation in modern physics. General relativity generalizes special relativity and refines Newton\'s law of universal gravitation, providing a unified description of gravity as a geometric property of space and time, or spacetime. In particular, the curvature of spacetime is directly related to the energy and momentum of whatever matter and radiation are present. The relation is specified by the Einstein field equations, a system of partial differential equations.',
//       extract_html: '<p><b>General relativity</b> (<b>GR</b>), also known as the <b>general theory of relativity</b> (<b>GTR</b>), is the geometric theory of gravitation published by Albert Einstein in 1915 and the current description of gravitation in modern physics. General relativity generalizes special relativity and refines Newton\'s law of universal gravitation, providing a unified description of gravity as a geometric property of space and time, or spacetime. In particular, the <i>curvature of spacetime</i> is directly related to the energy and momentum of whatever matter and radiation are present. The relation is specified by the Einstein field equations, a system of partial differential equations.</p>',
//       normalizedtitle: 'General relativity'
//     },
//     {
//       pageid: 54244,
//       ns: 0,
//       index: 5,
//       type: 'standard',
//       title: 'Gravitational_singularity',
//       displaytitle: 'Gravitational singularity',
//       namespace: [Object],
//       wikibase_item: 'Q201721',
//       titles: [Object],
//       thumbnail: [Object],
//       originalimage: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '936358548',
//       tid: '20f2e260-39d4-11ea-84f9-cb5dd797a5eb',
//       timestamp: '2020-01-18T09:22:58Z',
//       description: 'location in space-time where the gravitational field of a celestial body becomes infinite',
//       description_source: 'central',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'A gravitational singularity, spacetime singularity or simply singularity is a location in spacetime where the gravitational field of a celestial body is predicted to become infinite by general relativity in a way that does not depend on the coordinate system. The quantities used to measure gravitational field strength are the scalar invariant curvatures of spacetime, which includes a measure of the density of matter. Since such quantities become infinite at the singularity, the laws of normal spacetime break down.',
//       extract_html: '<p>A <b>gravitational singularity</b>, <b>spacetime singularity</b> or simply <b>singularity</b> is a location in spacetime where the gravitational field of a celestial body is predicted to become infinite by general relativity in a way that does not depend on the coordinate system. The quantities used to measure gravitational field strength are the scalar invariant curvatures of spacetime, which includes a measure of the density of matter. Since such quantities become infinite at the singularity, the laws of normal spacetime break down.</p>',
//       normalizedtitle: 'Gravitational singularity'
//     },
//     {
//       pageid: 173724,
//       ns: 0,
//       index: 7,
//       type: 'standard',
//       title: 'Hawking_radiation',
//       displaytitle: 'Hawking radiation',
//       namespace: [Object],
//       wikibase_item: 'Q497396',
//       titles: [Object],
//       thumbnail: [Object],
//       originalimage: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '943111537',
//       tid: 'be4d8c30-5a78-11ea-b391-3bd197326fdf',
//       timestamp: '2020-02-28T22:21:57Z',
//       description: 'Theory by Stephen Hawking',
//       description_source: 'central',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'Hawking radiation is black-body radiation that is predicted to be released by black holes, due to quantum effects near the black hole event horizon. It is named after the theoretical physicist Stephen Hawking, who provided a theoretical argument for its existence in 1974.',
//       extract_html: '<p><b>Hawking radiation</b> is black-body radiation that is predicted to be released by black holes, due to quantum effects near the black hole event horizon. It is named after the theoretical physicist Stephen Hawking, who provided a theoretical argument for its existence in 1974.</p>',
//       normalizedtitle: 'Hawking radiation'
//     },
//     {
//       pageid: 179260,
//       ns: 0,
//       index: 16,
//       type: 'standard',
//       title: 'No-hair_theorem',
//       displaytitle: 'No-hair theorem',
//       namespace: [Object],
//       wikibase_item: 'Q1376515',
//       titles: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '935478503',
//       tid: '05ce6290-357c-11ea-ac05-373022ca215a',
//       timestamp: '2020-01-12T20:42:14Z',
//       description: 'All black hole solutions of the Einstein–Maxwell equations can be characterized by mass, electric charge, and angular momentum',
//       description_source: 'local',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'The no-hair theorem states that all black hole solutions of the Einstein–Maxwell equations of gravitation and electromagnetism in general relativity can be completely characterized by only three externally observable classical parameters: mass, electric charge, and angular momentum. All other information about the matter which formed a black hole or is falling into it, "disappears" behind the black-hole event horizon and is therefore permanently inaccessible to external observers. Physicist John Archibald Wheeler expressed this idea with the phrase "black holes have no hair" which was the origin of the name. In a later interview, Wheeler said that Jacob Bekenstein coined this phrase.',
//       extract_html: '<p>The <b>no-hair theorem</b> states that all black hole solutions of the Einstein–Maxwell equations of gravitation and electromagnetism in general relativity can be completely characterized by only three <i>externally</i> observable classical parameters: mass, electric charge, and angular momentum. All other information about the matter which formed a black hole or is falling into it, "disappears" behind the black-hole event horizon and is therefore permanently inaccessible to external observers. Physicist John Archibald Wheeler expressed this idea with the phrase "black holes have no hair" which was the origin of the name. In a later interview, Wheeler said that Jacob Bekenstein coined this phrase.</p>',
//       normalizedtitle: 'No-hair theorem'
//     },
//     {
//       pageid: 207820,
//       ns: 0,
//       index: 17,
//       type: 'standard',
//       title: 'Compact_star',
//       displaytitle: 'Compact star',
//       namespace: [Object],
//       wikibase_item: 'Q368442',
//       titles: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '932019459',
//       tid: '5f3ab3a0-5a44-11ea-8878-b19abe4d689d',
//       timestamp: '2019-12-22T22:17:34Z',
//       description: 'classification in astronomy',
//       description_source: 'local',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'In astronomy, the term compact star refers collectively to white dwarfs, neutron stars, and black holes. It would grow to include exotic stars if such hypothetical, dense bodies are confirmed to exist. All compact objects have a high mass relative to their radius, giving them a very high density, compared to ordinary atomic matter.',
//       extract_html: '<p>In astronomy, the term <b>compact star</b> refers collectively to white dwarfs, neutron stars, and black holes. It would grow to include exotic stars if such hypothetical, dense bodies are confirmed to exist. All compact objects have a high mass relative to their radius, giving them a very high density, compared to ordinary atomic matter.</p>',
//       normalizedtitle: 'Compact star'
//     },
//     {
//       pageid: 240972,
//       ns: 0,
//       index: 2,
//       type: 'standard',
//       title: 'White_hole',
//       displaytitle: 'White hole',
//       namespace: [Object],
//       wikibase_item: 'Q131468',
//       titles: [Object],
//       thumbnail: [Object],
//       originalimage: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '942786265',
//       tid: '441c6300-58d9-11ea-aeee-093e740ecb5e',
//       timestamp: '2020-02-26T20:47:48Z',
//       description: 'Hypothetical celestial object, antagonistic to a black hole and a way to another universe',
//       description_source: 'central',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'In general relativity, a white hole is a hypothetical region of spacetime and singularity which cannot be entered from the outside, although energy-matter and light can escape from it. In this sense, it is the reverse of a black hole, which can be entered only from the outside and from which energy-matter and light cannot escape. White holes appear in the theory of eternal black holes. In addition to a black hole region in the future, such a solution of the Einstein field equations has a white hole region in its past. However, some believe this region does not exist for black holes that have formed through gravitational collapse, nor are there any known physical processes through which a white hole could be formed. Although information and evidence regarding white holes remains inconclusive, the 2006 GRB 060614 has been proposed as the first documented observance of a white hole.',
//       extract_html: '<p>In general relativity, a <b>white hole</b> is a hypothetical region of spacetime and singularity which cannot be entered from the outside, although energy-matter and light can escape from it. In this sense, it is the reverse of a black hole, which can be entered only from the outside and from which energy-matter and light cannot escape. White holes appear in the theory of eternal black holes. In addition to a black hole region in the future, such a solution of the Einstein field equations has a white hole region in its past. However, some believe this region does not exist for black holes that have formed through gravitational collapse, nor are there any known physical processes through which a white hole could be formed. Although information and evidence regarding white holes remains inconclusive, the 2006 GRB 060614 has been proposed as the first documented observance of a white hole.</p>',
//       normalizedtitle: 'White hole'
//     },
//     {
//       pageid: 424208,
//       ns: 0,
//       index: 19,
//       type: 'standard',
//       title: 'Gravastar',
//       displaytitle: 'Gravastar',
//       namespace: [Object],
//       wikibase_item: 'Q651063',
//       titles: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '937362295',
//       tid: '5e6f2640-5a44-11ea-b289-21c352f122c6',
//       timestamp: '2020-01-24T15:08:39Z',
//       description: 'Hypothesized alternative to black hole',
//       description_source: 'local',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'A gravastar is an object hypothesized in astrophysics by Pawel O. Mazur and Emil Mottola as an alternative to the black hole theory. It has usual black hole metric outside of the horizon, but de Sitter metric inside. On the horizon there is a thin shell of matter. The term "gravastar" is a portmanteau of the words "gravitational vacuum star".',
//       extract_html: '<p>A <b>gravastar</b> is an object hypothesized in astrophysics by Pawel O. Mazur and Emil Mottola as an alternative to the black hole theory. It has usual black hole metric outside of the horizon, but de Sitter metric inside. On the horizon there is a thin shell of matter. The term "gravastar" is a portmanteau of the words "gravitational vacuum star".</p>',
//       normalizedtitle: 'Gravastar'
//     },
//     {
//       pageid: 709427,
//       ns: 0,
//       index: 4,
//       type: 'standard',
//       title: 'Micro_black_hole',
//       displaytitle: 'Micro black hole',
//       namespace: [Object],
//       wikibase_item: 'Q609501',
//       titles: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '940860897',
//       tid: '8750b500-4f9b-11ea-b5c9-e3d9dc977b54',
//       timestamp: '2020-02-15T02:33:15Z',
//       description: 'black hole on a quantum level or with quantum effects',
//       description_source: 'central',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'Micro black holes, also called quantum mechanical black holes or mini black holes, are hypothetical tiny black holes, for which quantum mechanical effects play an important role. The concept that black holes may exist that are smaller than stellar mass was introduced in 1971 by Stephen Hawking.',
//       extract_html: '<p><b>Micro black holes</b>, also called <b>quantum mechanical black holes</b> or <b>mini black holes</b>, are hypothetical tiny black holes, for which quantum mechanical effects play an important role. The concept that black holes may exist that are smaller than stellar mass was introduced in 1971 by Stephen Hawking.</p>',
//       normalizedtitle: 'Micro black hole'
//     },
//     {
//       pageid: 1797708,
//       ns: 0,
//       index: 12,
//       type: 'standard',
//       title: 'Numerical_relativity',
//       displaytitle: 'Numerical relativity',
//       namespace: [Object],
//       wikibase_item: 'Q13012237',
//       titles: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '941079474',
//       tid: 'da665070-50c1-11ea-9c6a-cb31ed3b1cf0',
//       timestamp: '2020-02-16T13:40:07Z',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'Numerical relativity is one of the branches of general relativity that uses numerical methods and algorithms to solve and analyze problems. To this end, supercomputers are often employed to study black holes, gravitational waves, neutron stars and many other phenomena governed by Einstein\'s theory of general relativity. A currently active field of research in numerical relativity is the simulation of relativistic binaries and their associated gravitational waves. Other branches are also active.',
//       extract_html: '<p><b>Numerical relativity</b> is one of the branches of general relativity that uses numerical methods and algorithms to solve and analyze problems. To this end, supercomputers are often employed to study black holes, gravitational waves, neutron stars and many other phenomena governed by Einstein\'s theory of general relativity. A currently active field of research in numerical relativity is the simulation of relativistic binaries and their associated gravitational waves. Other branches are also active.</p>',
//       normalizedtitle: 'Numerical relativity'
//     },
//     {
//       pageid: 1987207,
//       ns: 0,
//       index: 11,
//       type: 'standard',
//       title: 'Black_hole_electron',
//       displaytitle: 'Black hole electron',
//       namespace: [Object],
//       wikibase_item: 'Q3045751',
//       titles: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '939767301',
//       tid: '9db94e40-4a8e-11ea-9de3-1bb0438f26e6',
//       timestamp: '2020-02-08T16:18:14Z',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'In physics, there is a speculative hypothesis that if there were a black hole with the same mass, charge and angular momentum as an electron, it would share other properties of the electron. Most notably, Brandon Carter showed in 1968 that the magnetic moment of such an object would match that of an electron. This is interesting because calculations ignoring special relativity and treating the electron as a small rotating sphere of charge give a magnetic moment that is off by roughly a factor of 2, the so-called gyromagnetic ratio.',
//       extract_html: '<p>In physics, there is a speculative hypothesis that if there were a black hole with the same mass, charge and angular momentum as an electron, it would share other properties of the electron. Most notably, Brandon Carter showed in 1968 that the magnetic moment of such an object would match that of an electron. This is interesting because calculations ignoring special relativity and treating the electron as a small rotating sphere of charge give a magnetic moment that is off by roughly a factor of 2, the so-called gyromagnetic ratio.</p>',
//       normalizedtitle: 'Black hole electron'
//     },
//     {
//       pageid: 2579267,
//       ns: 0,
//       index: 3,
//       type: 'standard',
//       title: 'Ring_singularity',
//       displaytitle: 'Ring singularity',
//       namespace: [Object],
//       wikibase_item: 'Q17105538',
//       titles: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '943848839',
//       tid: 'b5c54d60-5de2-11ea-8426-e960bdd9c8c8',
//       timestamp: '2020-03-04T06:38:05Z',
//       description: 'gravitational singularity of a rotating black hole',
//       description_source: 'central',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'A ring singularity or ringularity is the gravitational singularity of a rotating black hole, or a Kerr black hole, that is shaped like a ring.',
//       extract_html: '<p>A <b>ring singularity</b> or <b>ringularity</b> is the gravitational singularity of a rotating black hole, or a Kerr black hole, that is shaped like a ring.</p>',
//       normalizedtitle: 'Ring singularity'
//     },
//     {
//       pageid: 3352536,
//       ns: 0,
//       index: 14,
//       type: 'standard',
//       title: 'Exotic_star',
//       displaytitle: 'Exotic star',
//       namespace: [Object],
//       wikibase_item: 'Q15218857',
//       titles: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '932513159',
//       tid: '5f1159b0-5a44-11ea-8d71-b31c9e4032d9',
//       timestamp: '2019-12-26T13:16:08Z',
//       description: 'exotic star',
//       description_source: 'central',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'An exotic star is a hypothetical compact star composed of something other than electrons, protons, neutrons, or muons, and balanced against gravitational collapse by degeneracy pressure or other quantum properties. Exotic stars include quark stars and perhaps strange stars, as well as speculative preon stars. Of the various types of exotic star proposed, the most well evidenced and understood is the quark star.',
//       extract_html: '<p>An <b>exotic star</b> is a hypothetical compact star composed of something other than electrons, protons, neutrons, or muons, and balanced against gravitational collapse by degeneracy pressure or other quantum properties. Exotic stars include quark stars and perhaps strange stars, as well as speculative preon stars. Of the various types of exotic star proposed, the most well evidenced and understood is the quark star.</p>',
//       normalizedtitle: 'Exotic star'
//     },
//     {
//       pageid: 6146346,
//       ns: 0,
//       index: 10,
//       type: 'standard',
//       title: 'Magnetospheric_eternally_collapsing_object',
//       displaytitle: 'Magnetospheric eternally collapsing object',
//       namespace: [Object],
//       wikibase_item: 'Q3772242',
//       titles: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '942456477',
//       tid: '5eee6860-5a44-11ea-8ce3-31ddf25b8c49',
//       timestamp: '2020-02-24T20:03:31Z',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'The magnetospheric eternally collapsing object (MECO) is an alternative model for black holes initially proposed by Indian scientist Abhas Mitra in 1998 and later generalized by Darryl J. Leiter and Stanley L. Robertson. A proposed observable difference between MECOs and black holes is that a MECO can produce its own intrinsic magnetic field. An uncharged black hole cannot produce its own magnetic field, though its accretion disc can.',
//       extract_html: '<p>The <b>magnetospheric eternally collapsing object</b> (<b>MECO</b>) is an alternative model for black holes initially proposed by Indian scientist Abhas Mitra in 1998 and later generalized by Darryl J. Leiter and Stanley L. Robertson. A proposed observable difference between MECOs and black holes is that a MECO can produce its own intrinsic magnetic field. An uncharged black hole cannot produce its own magnetic field, though its accretion disc can.</p>',
//       normalizedtitle: 'Magnetospheric eternally collapsing object'
//     },
//     {
//       pageid: 11084989,
//       ns: 0,
//       index: 18,
//       type: 'standard',
//       title: 'Gravitational-wave_astronomy',
//       displaytitle: 'Gravitational-wave astronomy',
//       namespace: [Object],
//       wikibase_item: 'Q2392871',
//       titles: [Object],
//       thumbnail: [Object],
//       originalimage: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '933653865',
//       tid: 'f37b7c40-3ef4-11ea-ab8c-0d775f387d38',
//       timestamp: '2020-01-02T08:27:11Z',
//       description: 'type of astronomy involving observation of gravitational waves',
//       description_source: 'central',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'Gravitational-wave astronomy is an emerging branch of observational astronomy which aims to use gravitational waves to collect observational data about objects such as neutron stars and black holes, events such as supernovae, and processes including those of the early universe shortly after the Big Bang.',
//       extract_html: '<p><b>Gravitational-wave astronomy</b> is an emerging branch of observational astronomy which aims to use gravitational waves to collect observational data about objects such as neutron stars and black holes, events such as supernovae, and processes including those of the early universe shortly after the Big Bang.</p>',
//       normalizedtitle: 'Gravitational-wave astronomy'
//     },
//     {
//       pageid: 14464469,
//       ns: 0,
//       index: 1,
//       type: 'standard',
//       title: 'Outline_of_black_holes',
//       displaytitle: 'Outline of black holes',
//       namespace: [Object],
//       wikibase_item: 'Q28001176',
//       titles: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '914314668',
//       tid: '93d43630-3a7e-11ea-9f12-3f3497e59909',
//       timestamp: '2019-09-06T15:21:15Z',
//       description: 'Overview of and topical guide to black holes',
//       description_source: 'local',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'The following outline is provided as an overview of and topical guide to black holes:',
//       extract_html: '<p>The following outline is provided as an overview of and topical guide to black holes:</p>',
//       normalizedtitle: 'Outline of black holes'
//     },
//     {
//       pageid: 24467573,
//       ns: 0,
//       index: 8,
//       type: 'standard',
//       title: 'Black_star_(semiclassical_gravity)',
//       displaytitle: 'Black star (semiclassical gravity)',
//       namespace: [Object],
//       wikibase_item: 'Q9298968',
//       titles: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '941565810',
//       tid: '5f327640-5a44-11ea-a6b3-936383abe2fa',
//       timestamp: '2020-02-19T10:00:06Z',
//       description: 'gravitational object composed of matter',
//       description_source: 'central',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'A black star is a gravitational object composed of matter. It is a theoretical alternative to the black hole concept from general relativity. The theoretical construct was created through the use of semiclassical gravity theory. A similar structure should also exist for the Einstein–Maxwell–Dirac equations system, which is the (super) classical limit of quantum electrodynamics, and for the Einstein–Yang–Mills–Dirac system, which is the (super) classical limit of the standard model.',
//       extract_html: '<p>A <b>black star</b> is a gravitational object composed of matter. It is a theoretical alternative to the black hole concept from general relativity. The theoretical construct was created through the use of semiclassical gravity theory. A similar structure should also exist for the Einstein–Maxwell–Dirac equations system, which is the (super) classical limit of quantum electrodynamics, and for the Einstein–Yang–Mills–Dirac system, which is the (super) classical limit of the standard model.</p>',
//       normalizedtitle: 'Black star (semiclassical gravity)'
//     },
//     {
//       pageid: 29320146,
//       ns: 0,
//       index: 6,
//       type: 'standard',
//       title: 'Event_horizon',
//       displaytitle: 'Event horizon',
//       namespace: [Object],
//       wikibase_item: 'Q181741',
//       titles: [Object],
//       thumbnail: [Object],
//       originalimage: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '941982085',
//       tid: 'bed8dd80-54ec-11ea-96a6-b102b468e54a',
//       timestamp: '2020-02-21T20:57:14Z',
//       description: 'A region in spacetime from which nothing can escape',
//       description_source: 'local',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'In astrophysics, an event horizon is a boundary beyond which events cannot affect an observer.',
//       extract_html: '<p>In astrophysics, an <b>event horizon</b> is a boundary beyond which events cannot affect an observer.</p>',
//       normalizedtitle: 'Event horizon'
//     },
//     {
//       pageid: 33324714,
//       ns: 0,
//       index: 15,
//       type: 'standard',
//       title: 'Black_hole_cosmology',
//       displaytitle: 'Black hole cosmology',
//       namespace: [Object],
//       wikibase_item: 'Q4920115',
//       titles: [Object],
//       thumbnail: [Object],
//       originalimage: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '906243770',
//       tid: '66914650-36c7-11ea-925f-436817989f5f',
//       timestamp: '2019-07-14T16:07:04Z',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'A black hole cosmology is a cosmological model in which the observable universe is the interior of a black hole. Such models were originally proposed by theoretical physicist Raj Pathria, and concurrently by mathematician I. J. Good.',
//       extract_html: '<p>A <b>black hole cosmology</b> is a cosmological model in which the observable universe is the interior of a black hole. Such models were originally proposed by theoretical physicist Raj Pathria, and concurrently by mathematician I. J. Good.</p>',
//       normalizedtitle: 'Black hole cosmology'
//     },
//     {
//       pageid: 34022823,
//       ns: 0,
//       index: 20,
//       type: 'standard',
//       title: 'Binary_black_hole',
//       displaytitle: 'Binary black hole',
//       namespace: [Object],
//       wikibase_item: 'Q4913879',
//       titles: [Object],
//       thumbnail: [Object],
//       originalimage: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '935404996',
//       tid: '7a2536b0-3526-11ea-93fc-87cf69ab738a',
//       timestamp: '2020-01-12T10:29:50Z',
//       description: 'in spiral of two black holes around each other, leading to their merger',
//       description_source: 'central',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'A binary black hole (BBH) is a system consisting of two black holes in close orbit around each other. Like black holes themselves, binary black holes are often divided into stellar binary black holes, formed either as remnants of high-mass binary star systems or by dynamic processes and mutual capture, and binary supermassive black holes believed to be a result of galactic mergers.',
//       extract_html: '<p>A <b>binary black hole</b> (<b>BBH</b>) is a system consisting of two black holes in close orbit around each other. Like black holes themselves, binary black holes are often divided into stellar binary black holes, formed either as remnants of high-mass binary star systems or by dynamic processes and mutual capture, and binary supermassive black holes believed to be a result of galactic mergers.</p>',
//       normalizedtitle: 'Binary black hole'
//     },
//     {
//       pageid: 37749068,
//       ns: 0,
//       index: 13,
//       type: 'standard',
//       title: 'Extreme_mass_ratio_inspiral',
//       displaytitle: 'Extreme mass ratio inspiral',
//       namespace: [Object],
//       wikibase_item: 'Q5422400',
//       titles: [Object],
//       thumbnail: [Object],
//       originalimage: [Object],
//       lang: 'en',
//       dir: 'ltr',
//       revision: '937418169',
//       tid: '96981e50-3ef6-11ea-a335-edb65c48fb30',
//       timestamp: '2020-01-24T22:12:16Z',
//       content_urls: [Object],
//       api_urls: [Object],
//       extract: 'In astrophysics, an extreme mass ratio inspiral (EMRI) is the orbit of a relatively light object around a much heavier object, that gradually decays due the emission of gravitational waves. Such systems are likely to be found in the centers of galaxies, where stellar mass compact objects, such as stellar black holes and neutron stars, may be found orbiting a supermassive black hole. In the case of a black hole in orbit around another black hole this is an extreme mass ratio binary black hole. The term EMRI is sometimes used as a shorthand to denote the emitted gravitational waveform as well as the orbit itself.',
//       extract_html: '<p>In astrophysics, an <b>extreme mass ratio inspiral</b> (<b>EMRI</b>) is the orbit of a relatively light object around a much heavier object, that gradually decays due the emission of gravitational waves. Such systems are likely to be found in the centers of galaxies, where stellar mass compact objects, such as stellar black holes and neutron stars, may be found orbiting a supermassive black hole. In the case of a black hole in orbit around another black hole this is an extreme mass ratio binary black hole. The term EMRI is sometimes used as a shorthand to denote the emitted gravitational waveform as well as the orbit itself.</p>',
//       normalizedtitle: 'Extreme mass ratio inspiral'
//     }
//   ]
// }

// //         console.log(Object.keys(data.pages))

// // for (e in data.pages){
// //     console.log(data.pages[e].displaytitle)
// // }

// // "Black hole"
// // "Hawking radiation"
// // "Stephen Hawking"
// // "Solar mass"
// // "Roger Penrose"
// // "Supermassive black hole"
// // "Event horizon"
// // "LIGO Scientific Collaboration"
// // "Gravitational lens"
// // "Schwarzschild metric"
// // "Gravitational collapse"
// // "Virgo interferometer"
// // "John Archibald Wheeler"
// // "Karl Schwarzschild"
// // "General relativity"
// // "LIGO"
// // "Kerr metric"
// // "Intermediate-mass black hole"
// // "Quantum gravity"
// // "Spacetime"
// // "Brandon Carter"
// // "Gravitational singularity"
// // "Kerr–Newman metric"
// // "The New York Times"
// // "PubMed Central"
// // "Milky Way"
// // "Sagittarius A*"
// // "Kip Thorne"