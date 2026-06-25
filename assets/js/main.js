/* ============================================================
   IT Progress — main.js
   Mobile menu, FAQ accordion, tariff details, messengers, order form
   ============================================================ */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        /* ---------- Mobile aside menu ---------- */
        const aside = document.querySelector('.js-m-aside');
        const overlay = document.querySelector('.js-m-overlay');
        const openBtn = document.querySelector('.js-menu-open');
        const closeBtn = document.querySelector('.js-aside-close');

        function openMenu() {
            if (!aside) return;
            aside.classList.add('_opened');
            if (overlay) overlay.classList.add('_opened');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            if (!aside) return;
            aside.classList.remove('_opened');
            if (overlay) overlay.classList.remove('_opened');
            document.body.style.overflow = '';
        }

        if (openBtn) openBtn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        if (overlay) overlay.addEventListener('click', closeMenu);

        // Close aside when clicking a link inside it
        if (aside) {
            aside.querySelectorAll('a[href^="#"], a[href="/"]').forEach(function (link) {
                link.addEventListener('click', closeMenu);
            });
        }

        /* ---------- FAQ accordion ---------- */
        const faqList = document.querySelector('.js-accordion');
        if (faqList) {
            const items = faqList.querySelectorAll('.mg-main-faq__item');
            items.forEach(function (item) {
                const title = item.querySelector('.mg-main-faq__item-title');
                const body = item.querySelector('.mg-main-faq__item-body');
                if (!title || !body) return;

                title.addEventListener('click', function () {
                    const isOpen = item.classList.contains('is-open');

                    // Close all
                    items.forEach(function (other) {
                        other.classList.remove('is-open');
                        const b = other.querySelector('.mg-main-faq__item-body');
                        if (b) b.style.maxHeight = null;
                    });

                    // Open clicked (if it was closed)
                    if (!isOpen) {
                        item.classList.add('is-open');
                        body.style.maxHeight = body.scrollHeight + 'px';
                    }
                });
            });
        }

        /* ---------- Tariff "Batafsil" toggle ---------- */
        document.querySelectorAll('.js-tariff-more').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const id = btn.getAttribute('data-target');
                const details = document.getElementById(id);
                if (!details) return;
                const hidden = details.hasAttribute('hidden');
                if (hidden) {
                    details.removeAttribute('hidden');
                    btn.textContent = 'Yopish';
                } else {
                    details.setAttribute('hidden', '');
                    btn.textContent = 'Batafsil';
                }
            });
        });

        /* ---------- Floating messengers ---------- */
        const msgToggle = document.querySelector('.js-messengers-toggle');
        const msgList = document.querySelector('.js-messengers-list');
        if (msgToggle && msgList) {
            msgToggle.addEventListener('click', function () {
                msgList.classList.toggle('active');
            });
            // Close when clicking an item
            msgList.querySelectorAll('.mg-messengers__item').forEach(function (item) {
                item.addEventListener('click', function () {
                    msgList.classList.remove('active');
                });
            });
        }

        /* ---------- Order modal: set chosen tariff ---------- */
        const orderModal = document.getElementById('orderModal');
        const orderTariffText = document.querySelector('.js-order-tariff');
        if (orderModal && orderTariffText) {
            orderModal.addEventListener('show.bs.modal', function (event) {
                const trigger = event.relatedTarget;
                const tariff = trigger ? trigger.getAttribute('data-tariff') : null;
                if (tariff) {
                    orderTariffText.textContent = 'Tarif: ' + tariff;
                } else {
                    orderTariffText.textContent = "Ariza qoldiring — biz siz bilan bog'lanamiz";
                }
            });
        }

        /* ---------- Order form submit (demo) ---------- */
        const orderForm = document.querySelector('.js-order-form');
        if (orderForm) {
            orderForm.addEventListener('submit', function (e) {
                e.preventDefault();
                orderForm.innerHTML =
                    '<div class="text-center py-4">' +
                    '<i class="bx bx-check-circle text-success" style="font-size:64px;"></i>' +
                    '<h4 class="fw-bold mt-2">Rahmat!</h4>' +
                    '<p class="text-muted mb-0">Arizangiz qabul qilindi. Tez orada siz bilan bog\'lanamiz.</p>' +
                    '</div>';
            });
        }

    });
})();
