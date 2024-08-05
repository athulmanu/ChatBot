$(document).ready(function () {
    var $messages = $('.messages-content'),
        d, h, m,
        i = 0;

    console.log('JavaScript file loaded');

    $(window).on('load', function () {
        console.log('Window loaded');
        $messages.mCustomScrollbar();
        setTimeout(function () {
            fakeMessage();
        }, 100);
    });

    function updateScrollbar() {
        console.log('Updating scrollbar');
        $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
            scrollInertia: 10,
            timeout: 0
        });
    }

    function setDate() {
        d = new Date();
        if (m != d.getMinutes()) {
            m = d.getMinutes();
            $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
        }
    }

    function insertMessage() {
        console.log('insertMessage function called');
        var msgInput = $('#message-input');
        var msg = msgInput.val().trim();
        console.log('Message from input field:', msgInput.val());
        console.log('Message after trimming:', msg);
        if (msg === '') {
            return false;
        }
        $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        msgInput.val(null);
        updateScrollbar();
        setTimeout(function () {
            fakeMessage();
        }, 1000 + (Math.random() * 20) * 100);
    }

    $('#message-submit').on('click', function () {
        console.log('Message submit button clicked');
        insertMessage();
    });

    $(window).on('keydown', function (e) {
        if (e.which === 13) {
            insertMessage();
            return false;
        }
    });

    var Fake = [
        'Hi there, I\'m Fabio and you?',
        'Nice to meet you',
        'How are you?',
        'Not too bad, thanks',
        'What do you do?',
        'That\'s awesome',
        'Codepen is a nice place to stay',
        'I think you\'re a nice person',
        'Why do you think that?',
        'Can you explain?',
        'Anyway I\'ve gotta go now',
        'It was a pleasure chat with you',
        'Time to make a new codepen',
        'Bye',
        ':)'
    ];

    function fakeMessage() {
        console.log('fakeMessage function called');
        if ($('#message-input').val() !== '') {
            return false;
        }
        $('<div class="message loading new"><figure class="avatar"><img src="robot (3).png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
        updateScrollbar();

        setTimeout(function () {
            $('.message.loading').remove();
            $('<div class="message new"><figure class="avatar"><img src="robot (3).png" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
            setDate();
            updateScrollbar();
            i++;
        }, 1000 + (Math.random() * 20) * 100);
    }

    // Show chat bot when avatar is clicked
    $('.chat-avatar').on('click', function (event) {
        event.stopPropagation(); // Prevent click event from bubbling up to the document
        $('.chat').toggle(); // Toggle the chat visibility
    });

    // Hide chat bot when clicking outside of the chat container
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.chat-container, .chat-avatar').length) {
            $('.chat').hide(); // Hide the chat if clicked outside
        }
    });
});
