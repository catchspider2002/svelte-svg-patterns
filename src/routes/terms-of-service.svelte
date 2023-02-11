<script>
  import Footer from "../components/Footer.svelte";
  import lang from "./_lang.js";
  let strings = lang.strings;

  import Constants from "./_constants.js";
  let page = "privacy-policy";
  let { title, url, keywords, desc, image, versions } =
    Constants.pageDetails(page);
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="canonical" href={url} />
  {#if versions}
    {#each versions as version}
      <link rel="alternate" href={version.website} hreflang={version.lang} />
    {/each}
  {/if}
  <meta name="description" content={desc} />
  <meta name="keywords" content={keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={desc} />
  <meta property="og:image" content={image} />

  <!-- Twitter -->
  <meta name="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={desc} />
  <meta name="twitter:image" content={image} />
  <meta name="twitter:image:src" content={image} />
  <meta name="twitter:image:alt" content={title} />
</svelte:head>

<div class="secondary-text-color pattern-bg p-8 text-start gray-text">
  <h1 class="mt-12 p-2 mb-2 font-semibold text-4xl uppercase white-text">
    Terms of Service:
  </h1>
  <p class="pt-2 pb-6 gray-text">
    Welcome to our vector pattern download premium feature (the "Service"). By
    using the Service, you agree to be bound by the following terms and
    conditions (these "Terms"). If you do not agree to these Terms, please do
    not use the Service.
    <br />
  </p>
  <ol class="gray-text">
    <li>
      <span class="white-text font-semibold">Description of Service:</span> The Service
      allows you to download all available vector patterns from our website for a
      one-time fee.
    </li>
    <li>
      <span class="white-text font-semibold">Payment:</span> The one-time fee for
      the Service is payable in full at the time of purchase and is non-refundable
      and non-cancellable.
    </li>
    <li>
      <span class="white-text font-semibold">Use of Service:</span> The Service is
      for your personal use only and you agree not to distribute, modify, or create
      derivative works based on the vector patterns downloaded through the Service.
    </li>
    <li>
      <span class="white-text font-semibold">Ownership:</span> The vector patterns
      and all intellectual property rights related to them remain the property of
      Pattern Monster and are protected by copyright and other intellectual property
      laws. By downloading the vector patterns, you are granted a limited, non-exclusive,
      non-transferable license to use the vector patterns for your personal use only.
    </li>
    <li>
      <span class="white-text font-semibold">Disclaimer of Warranties:</span> The
      Service and the vector patterns are provided "as is" and "as available" without
      warranty of any kind, either express or implied, including but not limited
      to the implied warranties of merchantability, fitness for a particular purpose,
      and non-infringement.
    </li>
    <li>
      <span class="white-text font-semibold">Limitation of Liability:</span> Pattern
      Monster will not be liable for any damages arising from the use of the Service
      or the vector patterns, including but not limited to direct, indirect, incidental,
      special, or consequential damages.
    </li>
    <li>
      <span class="white-text font-semibold">Changes to Terms:</span> Pattern Monster
      reserves the right to modify these Terms at any time, and your continued use
      of the Service following any such modification constitutes your acceptance
      of the new Terms.
    </li>
    <li>
      <span class="white-text font-semibold">Termination:</span> Pattern Monster
      may terminate your use of the Service at any time and for any reason, without
      notice.
    </li>
    <li>
      <span class="white-text font-semibold">Governing Law:</span> These Terms and
      your use of the Service shall be governed by and construed in accordance with
      the laws of India.
    </li>
    <li>
      <span class="white-text font-semibold">Dispute Resolution:</span> Any disputes
      arising from or relating to these Terms or the Service shall be resolved through
      binding arbitration in accordance with the India Arbitration Act.
    </li>
  </ol>
  <span class="gray-text"
    >By using the Service, you acknowledge that you have read and agree to these
    Terms. If you have any questions about these Terms, please contact us at
    [insert email or contact form].</span
  >

  <h1 class="mt-12 p-2 mb-2 font-semibold text-4xl uppercase white-text">
    Cancellation and Refund Policy:
  </h1>
  <p class="pt-2 pb-6 gray-text">
    Please note that the vector pattern download premium feature is a one-time
    fee and is non-refundable and non-cancellable. By purchasing this premium
    feature, you acknowledge and agree that you are purchasing a digital product
    and that there will be no cancellations or refunds provided for this
    purchase.

    <br /><br />If you have any questions or concerns about your purchase,
    please contact us at [insert email or contact form]. We are always here to
    help!
  </p>
</div>
<Footer />
