/* RE/MAX STEP TEMPLATE ENGINE v10 */
(function () {
    'use strict';
    function init() {
        var doc = document;
        if (doc.getElementById('stepBar')) return;
        var isKits = !!(doc.getElementById('type-kits') || doc.getElementById('type_kits'));
        var isUnicos = !!(doc.getElementById('type-unicos') || doc.getElementById('type_unicos'));
        var originalForm = doc.querySelector('form');
        if (!originalForm) return;

        // ═══ FONTS ═══
        if (!doc.querySelector('link[href*="Outfit"]')) {
            var pc = doc.createElement('link'); pc.rel = 'preconnect'; pc.href = 'https://fonts.googleapis.com'; doc.head.appendChild(pc);
            var fn = doc.createElement('link'); fn.rel = 'stylesheet'; fn.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap'; doc.head.appendChild(fn);
        }

        // ═══ CSS ═══
        var css = doc.createElement('style'); css.id = 'stp-css';
        css.textContent =
            ':root{--rm-blue:#003DA5;--rm-blue-dark:#002B75;--rm-blue-light:#E8EEF7;--rm-blue-mist:#F2F5FA;--rm-red:#DC1C2E;--rm-red-hover:#B81525;--rm-white:#FFF;--rm-gray-50:#F8F9FC;--rm-gray-200:#D8DDE8;--rm-gray-400:#9AA3B5;--rm-gray-600:#5A6478;--rm-gray-800:#2D3444;--rm-shadow-sm:0 1px 3px rgba(0,40,100,.06);--rm-shadow-lg:0 8px 32px rgba(0,40,100,.1);--rm-radius:10px;--rm-radius-lg:16px;--rm-tr:.25s cubic-bezier(.4,0,.2,1)}'
            + '.stp-consumed{display:none!important}'
            + '.steps-container{max-width:1140px;margin:0 auto;width:100%}'

            // Step bar
            + '.step-bar{background:var(--rm-blue-mist);border-bottom:1px solid var(--rm-gray-200);position:sticky;top:0;z-index:100}'
            + '.step-bar-inner{max-width:1140px;margin:0 auto;display:flex;align-items:center;height:60px;padding:0 20px}'
            + '.step-bar-steps{display:flex;align-items:center;flex:1}'
            + '.step-item{display:flex;align-items:center;gap:8px;cursor:pointer;padding:8px 16px;border-radius:50px;transition:var(--rm-tr);user-select:none}'
            + '.step-item:hover{background:rgba(0,61,165,.06)}'
            + '.step-number{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:"Outfit",sans-serif;font-weight:700;font-size:.8rem;background:var(--rm-gray-200);color:var(--rm-gray-400);transition:var(--rm-tr);flex-shrink:0}'
            + '.step-label{font-family:"Outfit",sans-serif;font-weight:600;font-size:.85rem;color:var(--rm-gray-400);transition:var(--rm-tr);white-space:nowrap}'
            + '.step-chevron{color:var(--rm-gray-200);margin:0 4px;flex-shrink:0}'
            + '.step-item.active .step-number{background:var(--rm-blue);color:var(--rm-white);box-shadow:0 2px 8px rgba(0,61,165,.3)}'
            + '.step-item.active .step-label{color:var(--rm-blue)}'
            + '.step-item.completed .step-number{background:#1FAD5F;color:var(--rm-white)}'
            + '.step-item.completed .step-label{color:#1A8F4E}'
            + '.step-item.completed .step-number-text{display:none}'
            + '.step-item.completed .step-check{display:inline}'
            + '.step-check{display:none;font-size:.75rem}'

            // Summary in step bar (right side)
            + '.stp-bar-summary{display:none;align-items:center;gap:16px;font-family:"DM Sans",sans-serif;font-size:.82rem;color:var(--rm-gray-600);flex-shrink:0;padding-left:16px;border-left:1px solid var(--rm-gray-200);margin-left:auto}'
            + '.stp-bar-summary.has-content{display:flex}'
            + '.stp-bar-summary-item{display:flex;align-items:center;gap:4px}'
            + '.stp-bar-summary-val{font-family:"Outfit",sans-serif;font-weight:700;color:var(--rm-gray-800)}'
            + '.stp-bar-summary-price{font-family:"Outfit",sans-serif;font-weight:800;font-size:.95rem;color:var(--rm-blue)}'
            + '.step-bar-inner.stp-centered{justify-content:center}'
            + '.step-bar-inner.stp-centered .step-bar-steps{flex:none}'

            // Layout
            + '.step-body{display:flex;gap:0;min-height:calc(100vh - 60px)}'
            + '.col-preview{width:62%;flex-shrink:0;background:var(--rm-white);padding:40px 36px}'
            + '.col-preview-sticky{position:sticky;top:80px}'
            + '.preview-heading{font-family:"Outfit",sans-serif;font-weight:800;font-size:1.55rem;color:var(--rm-blue-dark);margin-bottom:6px;line-height:1.25}'
            + '.preview-sub{font-size:.92rem;color:var(--rm-gray-600);margin-bottom:28px;line-height:1.5}'
            + '.mockup-frame{background:var(--rm-blue-mist);border-radius:var(--rm-radius-lg);padding:32px;display:none;align-items:center;justify-content:center;min-height:260px;position:relative;overflow:hidden}'
            + '.mockup-frame.has-content{display:flex}'
            + '.mockup-frame::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 30% 20%,rgba(0,61,165,.04) 0%,transparent 70%);pointer-events:none}'
            + '.mockup-frame img,.mockup-frame picture img{max-width:100%;max-height:340px;border-radius:var(--rm-radius);box-shadow:var(--rm-shadow-lg);position:relative;z-index:1}'

            // Form col
            + '.col-form{flex:1;background:var(--rm-blue-mist);padding:32px 28px;min-height:calc(100vh - 60px);border-left:1px solid var(--rm-gray-200);overflow-y:auto}'
            + '.form-step-content{display:none;animation:stpF .35s ease-out}'
            + '.form-step-content.visible{display:block}'
            + '@keyframes stpF{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}'

            // Fields
            + '.form-section-title{font-family:"Outfit",sans-serif;font-weight:700;font-size:.95rem;color:var(--rm-blue-dark);margin-bottom:14px;margin-top:20px;padding-bottom:8px;border-bottom:2px solid var(--rm-blue);display:inline-block}'
            + '.form-section-title:first-child{margin-top:0}'
            + '.field-group{margin-bottom:16px}'
            + '.field-group>label{display:block;font-weight:600;font-size:.8rem;color:var(--rm-gray-600);margin-bottom:5px;text-transform:uppercase;letter-spacing:.03em}'
            + '.field-group input[type="text"],.field-group input[type="email"],.field-group input[type="tel"],.field-group input[type="number"],.field-group textarea,.field-group select{width:100%;padding:12px 14px;border:1.5px solid var(--rm-gray-200);border-radius:var(--rm-radius);font-family:"DM Sans",sans-serif;font-size:.92rem;color:var(--rm-gray-800);background:var(--rm-white);transition:var(--rm-tr);outline:none}'
            + '.field-group input:focus,.field-group textarea:focus,.field-group select:focus{border-color:var(--rm-blue);box-shadow:0 0 0 3px rgba(0,61,165,.1)}'
            + '.field-group textarea{resize:vertical;min-height:80px}'

            // Radio
            + '.stp-radio-group{display:flex;flex-direction:column;gap:8px}'
            + '.stp-radio-opt{display:flex;align-items:center;gap:10px;padding:12px 16px;border:1.5px solid var(--rm-gray-200);border-radius:var(--rm-radius);background:var(--rm-white);cursor:pointer;transition:var(--rm-tr);font-size:.9rem;color:var(--rm-gray-800)}'
            + '.stp-radio-opt:hover{border-color:var(--rm-blue-light);background:var(--rm-blue-mist)}'
            + '.stp-radio-opt.selected{border-color:var(--rm-blue);background:var(--rm-blue-light);color:var(--rm-blue-dark);font-weight:600}'
            + '.stp-radio-dot{width:18px;height:18px;border-radius:50%;border:2px solid var(--rm-gray-200);flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:var(--rm-tr)}'
            + '.stp-radio-opt.selected .stp-radio-dot{border-color:var(--rm-blue)}'
            + '.stp-radio-opt.selected .stp-radio-dot::after{content:"";width:10px;height:10px;border-radius:50%;background:var(--rm-blue)}'
            + '.stp-radio-qty{flex:1}'
            + '.stp-radio-price{font-family:"Outfit",sans-serif;font-weight:800;color:var(--rm-blue)}'

            // Upload
            + '.upload-area{border:2px dashed var(--rm-gray-200);border-radius:var(--rm-radius);background:var(--rm-white);padding:24px 16px;text-align:center;cursor:pointer;transition:var(--rm-tr);position:relative}'
            + '.upload-area:hover{border-color:var(--rm-blue);background:rgba(0,61,165,.02)}'
            + '.upload-area svg{color:var(--rm-blue);margin-bottom:8px}'
            + '.upload-area p{font-size:.82rem;color:var(--rm-gray-600)}'
            + '.upload-area strong{color:var(--rm-blue)}'
            + '.upload-area input[type="file"]{position:absolute;inset:0;opacity:0;cursor:pointer}'

            // Nav buttons
            + '.step-nav{display:flex;gap:12px;margin-top:28px;padding-top:20px;border-top:1px solid var(--rm-gray-200)}'
            + '.stp-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 28px;border-radius:50px;font-family:"Outfit",sans-serif;font-weight:700;font-size:.9rem;border:none;cursor:pointer;transition:var(--rm-tr);text-decoration:none;line-height:1}'
            + '.stp-btn-primary{background:var(--rm-red);color:var(--rm-white);box-shadow:0 3px 12px rgba(220,28,46,.25);flex:1}'
            + '.stp-btn-primary:hover{background:var(--rm-red-hover);box-shadow:0 5px 18px rgba(220,28,46,.3);transform:translateY(-1px)}'
            + '.stp-btn-secondary{background:var(--rm-white);color:var(--rm-gray-600);border:1.5px solid var(--rm-gray-200)}'
            + '.stp-btn-secondary:hover{border-color:var(--rm-blue);color:var(--rm-blue);background:var(--rm-blue-light)}'
            + '.stp-btn-submit{background:var(--rm-blue);color:var(--rm-white);box-shadow:0 3px 12px rgba(0,61,165,.25);flex:1}'
            + '.stp-btn-submit:hover{background:var(--rm-blue-dark);box-shadow:0 5px 18px rgba(0,61,165,.3);transform:translateY(-1px)}'

            // Modal
            + '.stp-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;animation:stpFadeIn .3s ease}'
            + '.stp-modal{background:var(--rm-white);border-radius:var(--rm-radius-lg);padding:40px 36px;max-width:440px;width:90%;text-align:center;position:relative;box-shadow:var(--rm-shadow-lg);animation:stpModalIn .35s ease-out}'
            + '@keyframes stpFadeIn{from{opacity:0}to{opacity:1}}'
            + '@keyframes stpModalIn{from{opacity:0;transform:scale(.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}'
            + '.stp-modal-close{position:absolute;top:12px;right:12px;background:none;border:none;color:var(--rm-gray-400);cursor:pointer;font-size:1.2rem;padding:4px 8px;border-radius:6px;transition:var(--rm-tr);line-height:1}'
            + '.stp-modal-close:hover{color:var(--rm-gray-800);background:var(--rm-gray-50)}'
            + '.stp-modal-icon{font-size:3rem;margin-bottom:16px;display:block}'
            + '.stp-modal-title{font-family:"Outfit",sans-serif;font-weight:800;font-size:1.3rem;color:var(--rm-blue-dark);margin-bottom:8px}'
            + '.stp-modal-text{font-size:.92rem;color:var(--rm-gray-600);margin-bottom:28px;line-height:1.5}'
            + '.stp-modal-btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 32px;border-radius:50px;font-family:"Outfit",sans-serif;font-weight:700;font-size:.92rem;border:none;cursor:pointer;transition:var(--rm-tr);background:var(--rm-red);color:var(--rm-white);box-shadow:0 3px 12px rgba(220,28,46,.25);text-decoration:none}'
            + '.stp-modal-btn:hover{background:var(--rm-red-hover);box-shadow:0 5px 18px rgba(220,28,46,.3);transform:translateY(-1px)}'

            // Description block (Kits)
            + '.stp-description-block{margin-top:28px;padding:20px;background:var(--rm-blue-mist);border-radius:var(--rm-radius);font-size:.92rem;color:var(--rm-gray-800);line-height:1.6}'
            + '.stp-description-block h1,.stp-description-block h2,.stp-description-block h3,.stp-description-block h4{font-family:"Outfit",sans-serif;color:var(--rm-blue-dark);margin-bottom:8px}'
            + '.stp-description-block p{margin-bottom:10px}'
            + '.stp-description-block ul,.stp-description-block ol{margin-bottom:10px;padding-left:20px}'
            + '.stp-description-block img{max-width:100%;border-radius:var(--rm-radius);margin:8px 0}'

            // Error mirror
            + '.stp-error-mirror{display:none;padding-top:6px;color:#ff0000;font-size:.78rem;font-weight:500}'
            // Hide original Netdeal feedback (we show our own modal)
            + 'form [class*="feedback-message"]{display:none!important}'
            + 'form [class*="feedback-message"].stp-show-original{display:block!important}'

            // Responsive
            + '@media(max-width:860px){.step-body{flex-direction:column}.col-preview{width:100%;padding:28px 20px}.col-preview-sticky{position:relative;top:auto}.col-form{min-height:auto;border-left:none;border-top:1px solid var(--rm-gray-200);padding:24px 20px}.mockup-frame{min-height:180px;padding:20px}.mockup-frame img{max-height:220px}.preview-heading{font-size:1.25rem}.step-item{padding:8px 10px;gap:6px}.step-label{font-size:.75rem}.step-chevron{margin:0 1px}.stp-bar-summary{display:none!important}}'
            + '@media(max-width:480px){.col-preview{padding:20px 16px}.col-form{padding:20px 16px}.stp-btn{padding:12px 20px;font-size:.85rem}.preview-heading{font-size:1.1rem}.mockup-frame{padding:16px;min-height:150px}.step-item{padding:6px;gap:4px}.step-label{font-size:.68rem}}';
        doc.head.appendChild(css);

        // ═══ HTML ═══
        var chev = '<svg class="step-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
        function si(n, l, a) { return '<div class="step-item' + (a ? ' active' : '') + '" data-step="' + n + '" onclick="window._stpGoTo(' + n + ')"><span class="step-number"><span class="step-number-text">' + n + '</span><span class="step-check">\u2713</span></span><span class="step-label">' + l + '</span></div>'; }

        var root = doc.createElement('div'); root.id = 'steps-template-root';
        root.innerHTML =
            '<div class="step-bar" id="stepBar"><div class="step-bar-inner">' +
            '<div class="step-bar-steps">' + si(1, 'Escolha seu produto', false) + chev + si(2, 'Personalize', true) + chev + si(3, 'Envie seu pedido', false) + '</div>' +
            '<div class="stp-bar-summary" id="stpBarSummary">' +
            '<span style="font-family:Outfit,sans-serif;font-weight:700;font-size:.82rem;color:var(--rm-blue-dark)">Resumo:</span>' +
            (isKits
                ? '<span style="font-family:Outfit,sans-serif;font-weight:700;font-size:.82rem;color:var(--rm-blue-dark);margin-right:4px">Kit de produtos</span><span style="font-family:Outfit,sans-serif;font-weight:700;font-size:.82rem;color:var(--rm-gray-600)">Total:</span><span class="stp-bar-summary-price" id="barSummaryPrice">\u2014</span>'
                : '<div class="stp-bar-summary-item"><span>Qtd:</span><span class="stp-bar-summary-val" id="barSummaryQty">\u2014</span></div><div class="stp-bar-summary-item"><span>Total:</span><span class="stp-bar-summary-price" id="barSummaryPrice">\u2014</span></div>') +
            '</div>' +
            '</div></div>' +
            '<div class="steps-container"><div class="step-body">' +
            '<div class="col-preview"><div class="col-preview-sticky">' +
            '<h2 class="preview-heading" id="previewHeading">Personalize seu produto</h2>' +
            '<p class="preview-sub" id="previewSub">Preencha os campos ao lado para personalizar seu pedido.</p>' +
            '<div class="mockup-frame" id="mockupFrame"></div>' +
            '</div></div>' +
            '<div class="col-form" id="colForm">' +
            '<div class="form-step-content visible" data-form-step="2" id="formStep2"></div>' +
            '<div class="form-step-content" data-form-step="3" id="formStep3"></div>' +
            '</div>' +
            '</div></div>';
        originalForm.parentNode.insertBefore(root, originalForm);

        // ═══ HIDE CONSUMED SECTIONS ═══
        ['product_step', 'customize_step', 'photo_mockup'].forEach(function (id) {
            var el = doc.getElementById(id); if (el) el.classList.add('stp-consumed');
        });
        // Kits: consume description & price sections
        if (isKits) {
            ['description_item', 'price_item'].forEach(function (id) {
                var el = doc.getElementById(id); if (el) el.classList.add('stp-consumed');
            });
        }
        var mockupSrc = doc.getElementById('photo_mockup');
        if (mockupSrc) { var ic = mockupSrc.closest('.ND_PAGE_IMAGE'); if (ic) ic.classList.add('stp-consumed'); }
        doc.querySelectorAll('[id^="upload_file"]').forEach(function (el) {
            if (originalForm.contains(el)) el.classList.add('stp-consumed');
        });
        var finalStep = doc.getElementById('final_step');
        if (finalStep) finalStep.classList.add('stp-consumed');

        // Qty/Size block
        var qtyInfo = findQtyOrSizeBlock();
        if (qtyInfo && qtyInfo.block) qtyInfo.block.classList.add('stp-consumed');

        // ═══ AUTO-FILL: Assunto + Terms checkbox ═══
        // Find "Assunto" select and pick first non-empty option
        originalForm.querySelectorAll('select').forEach(function (sel) {
            var name = (sel.getAttribute('name') || '').toLowerCase();
            var parentLabel = '';
            var block = sel.closest('.input-field-block');
            if (block) parentLabel = getLabel(block).toLowerCase();
            if (name.indexOf('assunto') !== -1 || parentLabel.indexOf('assunto') !== -1 || sel.classList.contains('input-subject-field')) {
                // Select first non-empty option
                for (var i = 0; i < sel.options.length; i++) {
                    if (sel.options[i].value) { sel.selectedIndex = i; sel.dispatchEvent(new Event('change', { bubbles: true })); break; }
                }
                // Hide the block
                if (block) block.classList.add('stp-consumed');
            }
        });
        // Find terms checkbox and auto-check it
        originalForm.querySelectorAll('.terms-container.checkbox-container, .checkbox-container[form-field-terms]').forEach(function (el) {
            var cb = el.querySelector('input[type="checkbox"]');
            if (cb && !cb.checked) { cb.checked = true; cb.dispatchEvent(new Event('change', { bubbles: true })); }
            el.classList.add('stp-consumed');
        });
        // Also try by attribute
        originalForm.querySelectorAll('[form-field-terms="true"]').forEach(function (cb) {
            if (!cb.checked) { cb.checked = true; cb.dispatchEvent(new Event('change', { bubbles: true })); }
            var container = cb.closest('.checkbox-container') || cb.parentElement;
            if (container) container.classList.add('stp-consumed');
        });

        // ═══ SUBMIT: Clone into step 3 nav, real stays hidden but functional ═══
        var realSubmitBtn = doc.getElementById('submit-form-send');

        // ═══ STATE ═══
        var currentStep = 2;
        var formStep2 = doc.getElementById('formStep2'), formStep3 = doc.getElementById('formStep3');
        var mockupFrame = doc.getElementById('mockupFrame');
        var barSummary = doc.getElementById('stpBarSummary');
        var barQty = doc.getElementById('barSummaryQty'), barPrice = doc.getElementById('barSummaryPrice');
        var previewH = doc.getElementById('previewHeading'), previewSub = doc.getElementById('previewSub');
        var meta2 = { heading: isKits ? 'Kit de produtos' : 'Personalize seu produto', sub: isKits ? 'Confira os detalhes do kit e envie seus dados de contato.' : 'Preencha os campos ao lado para personalizar seu pedido.' };
        var meta3 = { heading: isKits ? 'Envie sua solicita\u00e7\u00e3o' : 'Envie seu pedido', sub: isKits ? 'Preencha seus dados de contato. Retornaremos com o or\u00e7amento!' : 'Confira os dados e envie. Entraremos em contato em breve!' };

        function updateBarSummary(qty, price) {
            if (barQty) barQty.textContent = qty || '\u2014';
            barPrice.textContent = price || '\u2014';
            if (isKits) {
                if (price) barSummary.classList.add('has-content');
            } else {
                if (qty && price) barSummary.classList.add('has-content');
            }
        }

        // ═══ UTILS ═══
        function getLabel(b) { var n = b.querySelector('.input-label > span:first-child'); if (n && n.textContent.trim()) return n.textContent.trim(); var s = b.querySelector('label'); if (s && s.textContent.trim()) return s.textContent.trim(); return ''; }
        function getInput(b) { var sc = b.querySelectorAll('script'); for (var i = 0; i < sc.length; i++)if (sc[i].textContent.indexOf('"ATTACHMENT"') !== -1) return null; var n = b.querySelector('input.input-field,select.input-field,textarea.input-field'); if (n) return n; return b.querySelector('input:not([type="file"]):not([type="hidden"]):not([type="radio"]):not([type="checkbox"]),textarea,select:not(.input-subject-field)'); }
        function isReq(b) { var i = getInput(b); if (i && i.hasAttribute('required')) return true; var sp = b.querySelectorAll('.input-label > span'); for (var j = 0; j < sp.length; j++)if (sp[j].textContent.trim() === '*') return true; return false; }
        function findQtyOrSizeBlock() { var blocks = originalForm.querySelectorAll('.input-field-block[form-field]'); for (var i = 0; i < blocks.length; i++) { var l = getLabel(blocks[i]).toLowerCase(); if (l.indexOf('quantidade') !== -1 || l.indexOf('qtd') !== -1 || l.indexOf('tamanho') !== -1 || l.indexOf('escolha o tamanho') !== -1) return { block: blocks[i], isSize: l.indexOf('tamanho') !== -1 }; } return null; }

        // ═══ 1. MOCKUP ═══
        (function () {
            var src = doc.querySelector('#photo_mockup'); if (!src) return;
            mockupFrame.innerHTML = '';
            var pic = src.querySelector('picture');
            if (pic) { var c = pic.cloneNode(true); c.querySelectorAll('img').forEach(function (img) { img.removeAttribute('loading'); if (img.src.indexOf('data:image') !== -1) { var s = c.querySelector('source[srcset]'); if (s) img.src = s.getAttribute('srcset'); } }); mockupFrame.appendChild(c); mockupFrame.classList.add('has-content'); return; }
            var img = src.querySelector('img'); if (img) { var ci = img.cloneNode(true); ci.removeAttribute('loading'); mockupFrame.appendChild(ci); mockupFrame.classList.add('has-content'); }
        })();

        // ═══ 2. QTY/PRICE RADIOS ═══
        (function () {
            if (isKits) return;
            var info = findQtyOrSizeBlock(); if (!info) return;
            var block = info.block;
            var isSize = info.isSize;
            var radios = block.querySelectorAll('input[type="radio"]');
            if (radios.length === 0) return;
            var options = [];
            radios.forEach(function (radio) {
                var text = '';
                var labelEl = radio.closest('label') || radio.closest('.checkbox-container');
                if (labelEl) { var cb = labelEl.querySelector('.checkbox-label'); if (cb) text = cb.textContent.trim(); }
                if (!text) text = radio.value || '';
                if (!text) return;
                var p = parseQP(text);
                var displayLabel = p ? p.qty : text;
                var summaryQty = isSize ? '1' : (p ? p.qty : text);
                options.push({ radio: radio, text: text, displayLabel: displayLabel, summaryQty: summaryQty, price: p ? p.price : '' });
            });
            if (options.length === 0) return;
            var fg = doc.createElement('div'); fg.className = 'field-group';
            var lb = doc.createElement('label'); lb.textContent = isSize ? 'Tamanho' : 'Quantidade desejada'; fg.appendChild(lb);
            var grp = doc.createElement('div'); grp.className = 'stp-radio-group';
            options.forEach(function (opt, idx) {
                var row = doc.createElement('div');
                row.className = 'stp-radio-opt' + (idx === 0 ? ' selected' : '');
                row.innerHTML = '<div class="stp-radio-dot"></div><span class="stp-radio-qty">' + opt.displayLabel + '</span>' + (opt.price ? '<span class="stp-radio-price">' + opt.price + '</span>' : '');
                row.addEventListener('click', function () {
                    grp.querySelectorAll('.stp-radio-opt').forEach(function (r) { r.classList.remove('selected'); });
                    row.classList.add('selected');
                    opt.radio.checked = true;
                    opt.radio.dispatchEvent(new Event('change', { bubbles: true }));
                    updateBarSummary(opt.summaryQty, opt.price);
                });
                grp.appendChild(row);
            });
            fg.appendChild(grp); formStep2.appendChild(fg);
            if (!options[0].radio.checked) options[0].radio.checked = true;
            updateBarSummary(options[0].summaryQty, options[0].price);
        })();

        function parseQP(s) { if (!s || !s.trim()) return null; s = s.trim(); var p = s.split(/\s*[\u2014\u2013\-]\s*/); if (p.length < 2) { var m = s.match(/(R\$\s*[\d.,]+)/i); if (m) return { qty: s.replace(m[0], '').trim(), price: m[0].trim() }; return null; } return { qty: p[0].trim(), price: p.slice(1).join(' - ').trim() }; }

        // ═══ 3. BUILD FIELDS ═══
        // Clones include error spans. Real-time sync on input/change
        // so originals always have fresh values (fixes empty-on-submit bug).
        function buildFields(sectionId, target) {
            var section = doc.querySelector('#' + sectionId); if (!section) return;
            var blocks = section.querySelectorAll('.input-field-block[form-field]');
            if (blocks.length === 0) blocks = section.querySelectorAll('.form-field');
            blocks.forEach(function (block) {
                var lbl = getLabel(block).toLowerCase();
                if (lbl.indexOf('quantidade') !== -1 || lbl.indexOf('qtd') !== -1 || lbl.indexOf('tamanho') !== -1) return;
                if (lbl.indexOf('assunto') !== -1) return;
                var input = getInput(block); if (!input) return;

                var g = doc.createElement('div'); g.className = 'field-group';

                // Label
                var lb = doc.createElement('label'); lb.textContent = getLabel(block) + (isReq(block) ? ' *' : ''); g.appendChild(lb);

                // Clone input (no name to avoid Netdeal conflict)
                var clone = input.cloneNode(true);
                clone.className = ''; clone.removeAttribute('style'); clone.removeAttribute('id');
                var origName = input.getAttribute('name') || '';
                clone.setAttribute('data-orig-name', origName);
                clone.removeAttribute('name');
                if (input.tagName === 'SELECT') clone.innerHTML = input.innerHTML;
                g.appendChild(clone);

                // Error span (mirrors the original error span from Netdeal)
                var errorSpan = doc.createElement('span');
                errorSpan.className = 'input-error stp-error-mirror';
                errorSpan.style.cssText = 'display:none;padding-top:6px;color:#ff0000;font-size:11px';
                errorSpan.setAttribute('data-mirrors', block.id || '');
                g.appendChild(errorSpan);

                target.appendChild(g);

                // ── Real-time sync: clone → original on every keystroke/change ──
                // This ensures the original input always has the value the user typed,
                // so Netdeal reads the correct value at submit time.
                function liveSync() {
                    var orig = originalForm.querySelector('[name="' + origName + '"]');
                    if (orig) {
                        orig.value = clone.value;
                        if (orig.tagName === 'SELECT' && clone.tagName === 'SELECT') orig.selectedIndex = clone.selectedIndex;
                    }
                }
                clone.addEventListener('input', liveSync);
                clone.addEventListener('change', liveSync);
            });
        }

        // ═══ 4. UPLOADS ═══
        function buildUploads(target) {
            var secs = doc.querySelectorAll('[id^="upload_file"]'); if (secs.length === 0) return;
            var t = doc.createElement('div'); t.className = 'form-section-title'; t.textContent = 'Arquivos'; target.appendChild(t);
            secs.forEach(function (sec) {
                var lt = ''; var nd = sec.querySelector('.input-label > span:first-child'); if (nd) lt = nd.textContent.trim(); if (!lt) lt = 'Envie seu arquivo';
                var orig = sec.querySelector('input[type="file"]') || sec.querySelector('.file-input');
                var acc = orig ? (orig.getAttribute('accept') || '') : '';
                var mul = orig && orig.hasAttribute('multiple') ? 'multiple' : '';
                var a = doc.createElement('div'); a.className = 'field-group';
                a.innerHTML = '<label>' + lt + '</label><div class="upload-area"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><p>Clique ou arraste aqui<br><strong>Escolher arquivo</strong></p><input type="file" accept="' + acc + '" ' + mul + '></div>';
                target.appendChild(a);
                var fi = a.querySelector('input[type="file"]'), tp = a.querySelector('.upload-area p');
                fi.addEventListener('change', function () {
                    if (this.files.length) {
                        var n = []; for (var i = 0; i < this.files.length; i++)n.push(this.files[i].name);
                        tp.innerHTML = '<strong>' + n.join(', ') + '</strong>';
                        if (orig && typeof DataTransfer === 'function') { try { var dt = new DataTransfer(); for (var j = 0; j < this.files.length; j++)dt.items.add(this.files[j]); orig.files = dt.files; } catch (e) { } }
                    }
                });
            });
        }

        // ═══ 5. SYNC ═══
        // Final sync pass before submit (belt-and-suspenders with live sync above)
        function syncFieldsBack() {
            doc.querySelectorAll('#formStep2 [data-orig-name],#formStep3 [data-orig-name]').forEach(function (clone) {
                var n = clone.getAttribute('data-orig-name'); if (!n) return;
                var orig = originalForm.querySelector('[name="' + n + '"]'); if (!orig) return;
                orig.value = clone.value;
                if (orig.tagName === 'SELECT' && clone.tagName === 'SELECT') orig.selectedIndex = clone.selectedIndex;
            });
        }

        // Mirror Netdeal validation errors from hidden originals to steps UI
        function mirrorErrors() {
            doc.querySelectorAll('.stp-error-mirror').forEach(function (mirrorSpan) {
                var blockId = mirrorSpan.getAttribute('data-mirrors'); if (!blockId) return;
                var origError = doc.getElementById(blockId + '-error');
                if (origError) {
                    var errText = origError.textContent.trim();
                    if (errText && origError.style.display !== 'none') {
                        mirrorSpan.textContent = errText;
                        mirrorSpan.style.display = 'block';
                    } else {
                        mirrorSpan.textContent = '';
                        mirrorSpan.style.display = 'none';
                    }
                }
            });
        }

        // ═══ 6. NAV ═══
        var aB = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>';
        var aN = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>';
        var sendIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>';

        function buildNav(step, target) {
            var nav = doc.createElement('div'); nav.className = 'step-nav';
            if (step > 2) { var b = doc.createElement('button'); b.type = 'button'; b.className = 'stp-btn stp-btn-secondary'; b.innerHTML = aB + ' Voltar'; b.addEventListener('click', function () { window._stpGoTo(step - 1); }); nav.appendChild(b); }
            if (step < 3) { var n = doc.createElement('button'); n.type = 'button'; n.className = 'stp-btn stp-btn-primary'; n.innerHTML = 'Prosseguir ' + aN; n.addEventListener('click', function () { window._stpGoTo(step + 1); }); nav.appendChild(n); }
            if (step === 3 && realSubmitBtn) {
                // Clone submit button into step 3 nav
                var btnText = realSubmitBtn.textContent.trim() || 'Enviar Pedido';
                var cloneBtn = doc.createElement('button');
                cloneBtn.type = 'button';
                cloneBtn.className = 'stp-btn stp-btn-submit';
                cloneBtn.innerHTML = sendIcon + ' ' + btnText;
                cloneBtn.addEventListener('click', function () {
                    // Clear previous errors
                    doc.querySelectorAll('.stp-error-mirror').forEach(function (s) { s.style.display = 'none'; s.textContent = ''; });
                    try { syncFieldsBack(); } catch (e) { }
                    // Click the real hidden button → triggers Netdeal validation + submit
                    realSubmitBtn.click();
                    // After Netdeal validates (sync), mirror any error messages back to steps UI
                    setTimeout(mirrorErrors, 150);
                    setTimeout(mirrorErrors, 500);
                });
                nav.appendChild(cloneBtn);
            }
            target.appendChild(nav);
        }

        // ═══ 7. KITS: DESCRIPTION + PRICE ═══
        if (isKits) {
            var descItem = doc.getElementById('description_item');
            if (descItem) {
                var descClone = descItem.cloneNode(true);
                descClone.removeAttribute('id');
                descClone.classList.add('stp-description-block');
                var previewSticky = doc.querySelector('.col-preview-sticky');
                if (previewSticky) previewSticky.appendChild(descClone);
            }
            var priceItem = doc.getElementById('price_item');
            if (priceItem) {
                var kitPrice = (priceItem.textContent || priceItem.value || '').trim();
                updateBarSummary('', kitPrice);
            }
        }

        // ═══ 8. SUCCESS MODAL ═══
        function showSuccessModal() {
            var overlay = doc.createElement('div');
            overlay.className = 'stp-modal-overlay';
            overlay.innerHTML =
                '<div class="stp-modal">' +
                '<button class="stp-modal-close" title="Fechar">&times;</button>' +
                '<span class="stp-modal-icon">\uD83C\uDF89</span>' +
                '<h2 class="stp-modal-title">Seu pedido foi solicitado com sucesso!</h2>' +
                '<a href="./remax" class="stp-modal-btn">Continuar comprando</a>' +
                '</div>';
            doc.body.appendChild(overlay);
            overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
            overlay.querySelector('.stp-modal-close').addEventListener('click', function () { overlay.remove(); });
        }

        var feedbackEl = originalForm.querySelector('[class*="feedback-message"]');
        if (feedbackEl) {
            var obs = new MutationObserver(function () {
                if (feedbackEl.style.display !== 'none' && feedbackEl.style.display !== '') {
                    showSuccessModal();
                    obs.disconnect();
                }
            });
            obs.observe(feedbackEl, { attributes: true, attributeFilter: ['style'] });
        }

        // ═══ 9. ASSEMBLE ═══
        if (!isKits) {
            buildFields('customize_step', formStep2);
        }
        buildUploads(isKits ? formStep3 : formStep2);
        buildNav(2, formStep2);
        buildFields('final_step', formStep3);
        buildNav(3, formStep3);
        doc.querySelector('.step-item[data-step="1"]').classList.add('completed');

        // ═══ 10. NAV CONTROL ═══
        window._stpGoTo = function (step) {
            if (step === 1) { if (confirm('Voltar para a p\u00e1gina de produtos?')) window.history.back(); return; }
            if (step < 2 || step > 3) return;
            currentStep = step;
            doc.querySelectorAll('.step-item').forEach(function (el) {
                var s = parseInt(el.dataset.step); el.classList.remove('active', 'completed');
                if (s === currentStep) el.classList.add('active'); else if (s < currentStep) el.classList.add('completed');
            });
            doc.querySelectorAll('.form-step-content').forEach(function (el) {
                el.classList.remove('visible'); if (parseInt(el.dataset.formStep) === currentStep) el.classList.add('visible');
            });
            var m = currentStep === 2 ? meta2 : meta3;
            previewH.textContent = m.heading; previewSub.textContent = m.sub;
            doc.querySelector('.col-form').scrollTo({ top: 0, behavior: 'smooth' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
