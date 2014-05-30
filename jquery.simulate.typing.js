;(function ($, window, document, undefined) {

    var pluginName = "simulateTyping",
        defaults = {
        string: "",
        interval: 200,
        callback: function(){}
        // missing: onload, on click, etc
    },
        splitted,
        interval,
        deleteInterval,
        currentString;

    function Plugin (element, options) {
        this.$element = $(element);
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.string = this.settings.string;
        this.interval = this.settings.interval;
        this.callback = this.settings.callback;
        this.init();
    }

    Plugin.prototype = {
        init: function () {

            var $el = $(this.$element),
                scope = this,
                array;

            if ($el.is('input')) {
                $el.on('focus', function(){
                    clearInterval(interval);
                    clearInterval(deleteInterval);
                    this.value = '';
                });
            }
            if (Array.isArray(this.string))
                array = this.string.reverse();
            this.doInterval(array || this.string);
        },
        insertChar: function (scope) {
            var string = scope.$element.val();
            scope.$element.val(string+splitted.pop());
            if (splitted.length == 0) {
                clearInterval(interval);
                if (Array.isArray(scope.string) && scope.string.length > 0)
                    scope.eraseText();
            }
        },
        doInterval: function(string) {
            var str;
            if (string.length == 0){
                clearInterval(interval);
                return true;
            }

            if (Array.isArray(string))
                str = string.pop();
            else
                str = string;

            splitted = str.split('').reverse();
            interval = setInterval(this.insertChar, this.interval, this);
        },
        eraseText: function() {
            var scope = this;
            deleteInterval = setInterval(this.eraseChar, 100, this);
        },
        eraseChar: function(scope) {
            var $el = scope.element,
            currentString = $el.value,
            length = currentString.length;

            if (length == 0) {
                clearInterval(deleteInterval);
                scope.doInterval(scope.string);
            }

            $el.value = currentString = currentString.substring(0, currentString.length - 1);
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);
