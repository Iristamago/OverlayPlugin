// 表示する項目
var targets = ['Target', 'Focus', 'Hover', 'TargetOfTarget'];

// 項目のタイトル
var titles = {
    Target: 'ターゲット',
    Focus: 'フォーカス',
    Hover: 'ホバー',
    TargetOfTarget: 'TT'
};

var targetinfo = new Vue({
    el: '#targetinfo',
    data: {
        updated: false,
        locked: false,
        collapsed: false,
        targets: [],
    },
    attached: function () {
        window.addOverlayListener('EnmityTargetData', this.update);
        document.addEventListener('onOverlayStateUpdate', this.updateState);
        window.startOverlayEvents();
    },
    detached: function () {
        window.addOverlayListener('EnmityTargetData', this.update);
        document.removeEventListener('onOverlayStateUpdate', this.updateState);
    },
    methods: {
        update: function (enmity) {
            this.updated = true;
            this.targets = [];
            for (var k of targets) {
                var t = enmity[k];
                if (t == null) {
                    t = {
                      Name: 'none',
                      MaxHP: 0,
                      CurrentHP: 0,
                      Distance: 0,
                    };
                }
                t.Key = titles[k];
                this.targets.push(t);
            }
        },
        updateState: function (e) {
            this.locked = e.detail.isLocked;
        },
        toggleCollapse: function () {
            this.collapsed = !this.collapsed;
        }
    }
});
